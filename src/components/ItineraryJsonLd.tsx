import Script from "next/script";
import { TouristTrip, WithContext } from "schema-dts";

export default function ItineraryJsonLd({ city, lang, places }: Readonly<{ city: string; lang: string; places: any[] }>) {
  const jsonLd: WithContext<TouristTrip> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `Roteiro de viagem para ${city}`,
    description: `Descubra os principais pontos turísticos de ${city}, com atrações, locais históricos e experiências imperdíveis.`,
    url: `https://itinerar.com.br/${lang}/${encodeURIComponent(city.toLowerCase())}`,
    itinerary: places.map((place, index) => ({
      "@type": "TouristAttraction",
      name: place.displayName?.text,
      description: place.editorialSummary?.text,
      image: place.photos?.[0]?.photoUrl || place.photoUrl || undefined,
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName?.text || "")}`,
      position: index + 1,
      aggregateRating: place.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: place.rating,
            bestRating: "5",
          }
        : undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: place.formattedAddress,
        addressLocality: city,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      },
      additionalType: place.types || undefined,
    })),
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
