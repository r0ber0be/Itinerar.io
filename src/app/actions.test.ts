import { beforeEach, describe, expect, it, vi } from "vitest";
import { getTuristicPlaces } from "@/lib/googlePlaces";
import { getItineraryDirections } from "@/lib/directions";
import { fetchItinerary } from "./actions";

vi.mock("next/cache", () => ({
  unstable_cache: <T,>(fn: T) => fn,
}));

vi.mock("@/lib/googlePlaces", () => ({
  getTuristicPlaces: vi.fn(),
}));

vi.mock("@/lib/directions", () => ({
  getItineraryDirections: vi.fn(),
}));

function googlePlace(id: string, photoName?: string) {
  return {
    id,
    displayName: { text: `Place ${id}` },
    formattedAddress: `Street ${id}`,
    rating: 4.5,
    userRatingCount: 10,
    editorialSummary: { text: `About ${id}` },
    photos: photoName ? [{ name: photoName }] : undefined,
    location: { latitude: 1, longitude: 2 },
  };
}

const leg = (text: string) => ({ distance: { text }, duration: { text } });

beforeEach(() => {
  vi.mocked(getTuristicPlaces).mockReset();
  vi.mocked(getItineraryDirections).mockReset();
});

describe("fetchItinerary", () => {
  it("rejects city names longer than 60 characters without calling Google", async () => {
    const result = await fetchItinerary("a".repeat(61), "pt-br");

    expect(result.places).toEqual([]);
    expect(result.error).toMatch(/60 caracteres/);
    expect(getTuristicPlaces).not.toHaveBeenCalled();
  });

  it.each([[[]], [undefined]])("reports a city without tourist places (%o)", async (places) => {
    vi.mocked(getTuristicPlaces).mockResolvedValue(places);

    const result = await fetchItinerary("atlantis", "pt-br");

    expect(result).toEqual({ places: [], error: 'Nenhum ponto turístico encontrado para "atlantis".' });
  });

  it("maps a single place without asking for directions", async () => {
    vi.mocked(getTuristicPlaces).mockResolvedValue([googlePlace("a", "places/a/photos/1")]);

    const result = await fetchItinerary("paris", "en");

    expect(getItineraryDirections).not.toHaveBeenCalled();
    expect(result).toEqual({
      places: [{
        id: "a",
        displayName: { text: "Place a" },
        formattedAddress: "Street a",
        rating: 4.5,
        userRatingCount: 10,
        editorialSummary: { text: "About a" },
        photoUrl: "/api/imageProxy?photoName=places/a/photos/1",
        location: { lat: 1, lng: 2 },
        countryCode: undefined,
      }],
      legs: undefined,
      mapData: undefined,
    });
  });

  it("takes the country code from the place address components", async () => {
    vi.mocked(getTuristicPlaces).mockResolvedValue([
      {
        ...googlePlace("a"),
        addressComponents: [
          { longText: "Paris", shortText: "Paris", types: ["locality", "political"] },
          { longText: "França", shortText: "FR", types: ["country", "political"] },
        ],
      },
      {
        ...googlePlace("b"),
        addressComponents: [{ longText: "Paris", shortText: "Paris", types: ["locality"] }],
      },
    ]);
    vi.mocked(getItineraryDirections).mockResolvedValue(null);

    const result = await fetchItinerary("paris", "pt-br");

    expect(result.places.map((place) => place.countryCode)).toEqual(["FR", undefined]);
  });

  it("reorders the middle places in the optimized waypoint order", async () => {
    vi.mocked(getTuristicPlaces).mockResolvedValue(["a", "b", "c", "d"].map((id) => googlePlace(id)));
    const legs = [leg("1"), leg("2"), leg("3")];
    vi.mocked(getItineraryDirections).mockResolvedValue({
      routes: [{ legs, bounds: { north: 1 }, overview_polyline: { points: "xyz" }, waypoint_order: [1, 0] }],
    });

    const result = await fetchItinerary("paris", "en");

    expect(getItineraryDirections).toHaveBeenCalledWith(["a", "b", "c", "d"], "en");
    expect(result.places.map((place) => place.id)).toEqual(["a", "c", "b", "d"]);
    expect(result.places[0].photoUrl).toBeUndefined();
    expect(result.legs).toBe(legs);
    expect(result.mapData).toEqual({ bounds: { north: 1 }, polyline: "xyz" });
  });

  it("keeps the original order when Google returns no waypoint order", async () => {
    vi.mocked(getTuristicPlaces).mockResolvedValue(["a", "b"].map((id) => googlePlace(id)));
    vi.mocked(getItineraryDirections).mockResolvedValue({
      routes: [{ legs: [leg("1")], bounds: {}, overview_polyline: { points: "p" } }],
    });

    const result = await fetchItinerary("paris", "en");

    expect(result.places.map((place) => place.id)).toEqual(["a", "b"]);
    expect(result.legs).toHaveLength(1);
  });

  it.each([[null], [{ routes: [] }]])("returns the places without legs when there is no route (%o)", async (directions) => {
    vi.mocked(getTuristicPlaces).mockResolvedValue(["a", "b"].map((id) => googlePlace(id)));
    vi.mocked(getItineraryDirections).mockResolvedValue(directions);

    const result = await fetchItinerary("paris", "en");

    expect(result.places).toHaveLength(2);
    expect(result.legs).toBeUndefined();
    expect(result.mapData).toBeUndefined();
  });

  it("returns a generic error when something unexpected fails", async () => {
    vi.mocked(getTuristicPlaces).mockRejectedValue(new Error("boom"));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchItinerary("paris", "en");

    expect(result).toEqual({ places: [], error: "Ocorreu um erro inesperado ao buscar o itinerário." });
    expect(consoleError).toHaveBeenCalledOnce();
    consoleError.mockRestore();
  });
});
