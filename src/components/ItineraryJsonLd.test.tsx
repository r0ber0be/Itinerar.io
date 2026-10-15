import { describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import type { ItineraryPlace } from "@/app/actions";
import ItineraryJsonLd from "./ItineraryJsonLd";

type ScriptElement = ReactElement<{ id: string; type: string; dangerouslySetInnerHTML: { __html: string } }>;

const places: ItineraryPlace[] = [
  {
    id: "a",
    displayName: { text: "Torre Eiffel" },
    formattedAddress: "Champ de Mars, Paris",
    rating: 4.7,
    userRatingCount: 300,
    editorialSummary: { text: "Torre de ferro" },
    photoUrl: "/api/imageProxy?photoName=places/a/photos/1",
    location: { lat: 48.8584, lng: 2.2945 },
    countryCode: "FR",
  },
  {
    id: "b",
    displayName: { text: "Louvre" },
    formattedAddress: "Rue de Rivoli, Paris",
    location: { lat: 48.8606, lng: 2.3376 },
  },
];

function jsonLdOf(city: string, lang: string, list: ItineraryPlace[] = places) {
  const script = ItineraryJsonLd({ city, lang, places: list }) as ScriptElement;
  return { script, data: JSON.parse(script.props.dangerouslySetInnerHTML.__html) };
}

describe("ItineraryJsonLd", () => {
  it("describes the Portuguese trip with the canonical city URL", () => {
    const { script, data } = jsonLdOf("São Paulo", "pt-br", []);

    expect(script.props).toMatchObject({ id: "jsonld-itinerary", type: "application/ld+json" });
    expect(data).toMatchObject({
      "@type": "TouristTrip",
      name: "Roteiro de viagem para São Paulo",
      url: "https://itinerar.com.br/pt-br/s%C3%A3o-paulo",
    });
    expect(data.description).toMatch(/^Descubra os principais pontos turísticos de São Paulo/);
  });

  it("lists each place with its coordinates, absolute photo and rating", () => {
    const { data } = jsonLdOf("Paris", "en");
    const [first, second] = data.itinerary.itemListElement;

    expect(data.name).toBe("Paris travel itinerary");
    expect(data.description).toMatch(/^Discover the top tourist attractions in Paris/);
    expect(first).toMatchObject({
      position: 1,
      item: {
        name: "Torre Eiffel",
        description: "Torre de ferro",
        image: "https://itinerar.com.br/api/imageProxy?photoName=places/a/photos/1",
        geo: { latitude: 48.8584, longitude: 2.2945 },
        aggregateRating: { ratingValue: 4.7, ratingCount: 300 },
      },
    });
    expect(second.position).toBe(2);
    expect(second.item.image).toBeUndefined();
    expect(second.item.aggregateRating).toBeUndefined();
    expect(first.item.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Champ de Mars, Paris",
      addressLocality: "Paris",
      addressCountry: "FR",
    });
    // Sem país conhecido, é melhor omitir do que afirmar um país errado.
    expect(second.item.address).not.toHaveProperty("addressCountry");
    expect(second.item.geo).toEqual({ "@type": "GeoCoordinates", latitude: 48.8606, longitude: 2.3376 });
  });
});
