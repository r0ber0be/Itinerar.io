import Script from "next/script";
import { TouristTrip, WithContext } from "schema-dts";
import { toCitySlug } from "@/helpers/citySlug";
import type { ItineraryPlace } from "@/app/actions";

export default function ItineraryJsonLd({ city, lang, places }: Readonly<{ city: string; lang: string; places: ItineraryPlace[] }>) {
  const jsonLd: WithContext<TouristTrip> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: lang === "en" ? `${city} travel itinerary` : `Roteiro de viagem para ${city}`,
    description: lang === "en"
      ? `Discover the top tourist attractions in ${city}, with sights, historic places and must-see experiences.`
      : `Descubra os principais pontos turísticos de ${city}, com atrações, locais históricos e experiências imperdíveis.`,
    url: `https://itinerar.com.br/${lang}/${encodeURIComponent(toCitySlug(city))}`,
    itinerary: {
      "@type": "ItemList",
      itemListElement: places.map((place, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: place.displayName?.text,
          description: place.editorialSummary?.text,
          image: place.photoUrl ? `https://itinerar.com.br${place.photoUrl}` : undefined,
          geo: {
            "@type": "GeoCoordinates",
            latitude: place.location.lat,
            longitude: place.location.lng,
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: place.formattedAddress,
            addressLocality: city,
            addressCountry: place.countryCode,
          },
          containedInPlace: {
            "@type": "City",
            name: city
          },
          aggregateRating: place.rating
            ? {
              "@type": "AggregateRating",
              ratingValue: place.rating,
              ratingCount: place.userRatingCount,
              reviewCount: place.userRatingCount,
              bestRating: "5",
            }
          : undefined,
        }
      }))
    }
  };

  return (
    <Script
      id="jsonld-itinerary"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
