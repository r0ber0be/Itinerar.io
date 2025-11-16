import Script from "next/script";
import { TouristTrip, WithContext } from "schema-dts";

export default function ItineraryJsonLd({ city, lang, places }: Readonly<{ city: string; lang: string; places: any[] }>) {
  const jsonLd: WithContext<TouristTrip> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `Roteiro de viagem para ${city}`,
    description: `Descubra os principais pontos turísticos de ${city}, com atrações, locais históricos e experiências imperdíveis.`,
    url: `https://itinerar.com.br/${lang}/${encodeURIComponent(city.toLowerCase())}`,
    itinerary: {
      "@type": "ItemList",
      itemListElement: places.map((place, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: place.displayName?.text,
          description: place.editorialSummary?.text,
          image: place.photos?.[0]?.photoUrl,
          geo: {
            "@type": "GeoCoordinates",
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: place.formattedAddress,
            addressLocality: city,
            addressCountry: "BR",
          },
          aggregateRating: place.rating
            ? {
              "@type": "AggregateRating",
              ratingValue: place.rating,
              ratingCount: place.userRatingCount,
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
