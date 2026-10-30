// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import ptBr from "@/dictionaries/pt-br.json";
import type { ItineraryPlace, ItineraryResult } from "@/app/actions";
import { TranslationProvider } from "./providers/TranslationProvider";
import ResultsSection from "./ResultsSection";

afterEach(cleanup);

function place(id: string, overrides: Partial<ItineraryPlace> = {}): ItineraryPlace {
  return {
    id,
    displayName: { text: `Place ${id}` },
    formattedAddress: `Street ${id}`,
    location: { lat: 0, lng: 0 },
    ...overrides,
  };
}

const leg = (duration: string, distance: string) => ({ duration: { text: duration }, distance: { text: distance } });

function renderResults(state: ItineraryResult, searchedCity = "São Paulo") {
  return render(
    <TranslationProvider dictionary={ptBr}>
      <ResultsSection state={state} searchedCity={searchedCity} />
    </TranslationProvider>,
  );
}

describe("ResultsSection", () => {
  it("announces the error as an alert", () => {
    renderResults({ places: [], error: "Falhou" });

    expect(screen.getByRole("alert").textContent).toBe("Falhou");
  });

  it("renders nothing when there are no places", () => {
    const { container } = renderResults({ places: [] });

    expect(container.innerHTML).toBe("");
  });

  it("titles the results with the readable city name", () => {
    renderResults({ places: [place("a")] });

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Roteiro de viagem para São Paulo");
    expect(screen.getByRole("region", { name: "Roteiro de viagem para São Paulo" })).toBeTruthy();
  });

  it("lists a single place as the starting point without a Google Maps route", () => {
    renderResults({ places: [place("a")] });

    const [item] = screen.getAllByRole("listitem");
    expect(within(item).getByText(ptBr.startPoint)).toBeTruthy();
    expect(within(item).queryByText(ptBr.endPoint)).toBeNull();
    expect(within(item).getByText(ptBr.imageUnavailable)).toBeTruthy();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("links the whole route to Google Maps and warns that it opens a new tab", () => {
    renderResults({ places: [place("a"), place("b"), place("c")] });

    const link = screen.getByRole("link");
    expect(link.textContent).toContain(ptBr.openGoogleMapsButton);
    expect(link.textContent).toContain(ptBr.opensInNewTab);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("href")).toBe(
      "https://www.google.com/maps/dir/?api=1&origin=Street%20a&destination=Street%20c&waypoints=Street%20b&travelmode=driving",
    );
  });

  it("describes every stop in order with legs, rating, photo and summary", () => {
    renderResults({
      places: [
        place("a", { photoUrl: "/a.jpg", rating: 4.7, editorialSummary: { text: "Resumo A" } }),
        place("b"),
        place("c"),
        place("d", { photoUrl: "/d.jpg" }),
      ],
      legs: [leg("5 min", "1 km"), leg("6 min", "2 km"), leg("7 min", "3 km")],
    });

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(screen.getByRole("list").tagName).toBe("OL");

    expect(within(items[0]).getByText("Resumo A")).toBeTruthy();
    expect(within(items[0]).getByText(`${ptBr.rating}:`)).toBeTruthy();
    expect(items[0].textContent).toContain("4,7");
    expect(within(items[0]).getByRole("img", { name: "Place a" }).getAttribute("loading")).toBe("eager");

    expect(items[1].textContent).toContain(`${ptBr.fromPreviousStop} 5 min (1 km)`);
    expect(within(items[3]).getByText(ptBr.endPoint)).toBeTruthy();
    expect(within(items[3]).getByRole("img", { name: "Place d" }).getAttribute("loading")).toBe("lazy");
  });

  it("omits the legs when the route has none", () => {
    renderResults({ places: [place("a"), place("b")] });

    expect(screen.queryByText(ptBr.fromPreviousStop)).toBeNull();
  });
});
