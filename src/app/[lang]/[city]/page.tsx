import { Metadata } from "next";
import HotTopics from "@/components/HotTopics";
import { capitalizeFirstLetterOfCity } from "@/helpers/captalizeAllFirstWord";
import ItineraryJsonLd from "@/components/ItineraryJsonLd";
import { fetchItinerary } from "@/app/actions";
import ResultsSection from "@/components/ResultsSection";
import { cityNameFromSlug, toCitySlug } from "@/helpers/citySlug";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const revalidate = 259200;

export function generateStaticParams() {
  return [];
}

type HomeProps = {
  params: Promise<{ city: string, lang: string }>;
};

export async function generateMetadata({
  params,
}: Readonly<{
  params: HomeProps['params']
}>): Promise<Metadata> {
  const { city, lang } = await params;
  const decodedCity = cityNameFromSlug(city);
  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);
  const citySlug = toCitySlug(decodedCity);
  const title = lang === "en"
    ? `${capitalizedCity} travel itinerary`
    : `Roteiro de viagem em ${capitalizedCity}`;
  const description = lang === "en"
    ? `Explore ${capitalizedCity} with a personalized itinerary, including tourist attractions, travel tips and cultural sights. Plan your trip with ease.`
    : `Explore ${capitalizedCity} com um roteiro personalizado, incluindo pontos turísticos, dicas de viagem e atrações culturais. Planeje sua viagem com facilidade.`;
  const pageUrl = `${baseUrl}/${lang}/${citySlug}`;
  const imageUrl = `${baseUrl}/assets/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    robots: {
      follow: true,
      index: true,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "pt-br": `${baseUrl}/pt-br/${citySlug}`,
        en: `${baseUrl}/en/${citySlug}`,
        "x-default": `${baseUrl}/pt-br/${citySlug}`,
      }
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Itinerar",
      locale: lang === "en" ? "en_US" : "pt_BR",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Logo Itinerar",
        }
      ], 
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function Home({
  params
}: Readonly<{
    params: HomeProps['params']
  }>
) {
  const { city, lang } = await params;
  const decodedCity = cityNameFromSlug(city);
  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);

  const itineraryResult = await fetchItinerary(city, lang);
  const { places } = itineraryResult
  return (
    <>
      <ItineraryJsonLd city={capitalizedCity} lang={lang} places={places} />
      <ResultsSection state={itineraryResult} searchedCity={city} />
      <HotTopics lang={lang} />
    </>
  );
}
