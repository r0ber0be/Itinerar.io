import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import { fetchItinerary } from "@/app/actions";
import Home, { generateMetadata, generateStaticParams } from "./page";

vi.mock("@/app/actions", () => ({
  fetchItinerary: vi.fn(),
}));

const params = (city: string, lang: string) => Promise.resolve({ city, lang });

describe("city generateMetadata", () => {
  it("builds an English title and a hyphenated canonical for en", async () => {
    const metadata = await generateMetadata({ params: params("new-york", "en") });

    expect(metadata.title).toBe("New York travel itinerary");
    expect(metadata.description).toMatch(/^Explore New York with a personalized itinerary/);
    expect(metadata.alternates).toEqual({
      canonical: "https://itinerar.com.br/en/new-york",
      languages: {
        "pt-br": "https://itinerar.com.br/pt-br/new-york",
        en: "https://itinerar.com.br/en/new-york",
        "x-default": "https://itinerar.com.br/pt-br/new-york",
      },
    });
    expect(metadata.openGraph).toMatchObject({ url: "https://itinerar.com.br/en/new-york", locale: "en_US" });
  });

  it("keeps the Portuguese title for pt-br", async () => {
    const metadata = await generateMetadata({ params: params("rio-de-janeiro", "pt-br") });

    expect(metadata.title).toBe("Roteiro de viagem em Rio De Janeiro");
    expect(metadata.openGraph).toMatchObject({ locale: "pt_BR" });
  });

  it("points duplicated city slugs to the canonical city", async () => {
    const metadata = await generateMetadata({ params: params("nova-iorque", "pt-br") });

    expect(metadata.alternates?.canonical).toBe("https://itinerar.com.br/pt-br/new-york");
  });
});

describe("city generateStaticParams", () => {
  it("prerenders no city at build time so every city is generated on demand", () => {
    expect(generateStaticParams()).toEqual([]);
  });
});

describe("city page", () => {
  beforeEach(() => {
    vi.mocked(fetchItinerary).mockResolvedValue({ places: [] });
  });

  it("fetches the itinerary with the raw slug and passes the readable city name to JSON-LD", async () => {
    const page = await Home({ params: params("new-york", "en") }) as ReactElement<{ children: ReactElement<Record<string, unknown>>[] }>;
    const [jsonLd, results] = page.props.children;

    expect(fetchItinerary).toHaveBeenCalledWith("new-york", "en");
    expect(jsonLd.props).toMatchObject({ city: "New York", lang: "en", places: [] });
    expect(results.props).toMatchObject({ searchedCity: "new-york" });
  });
});
