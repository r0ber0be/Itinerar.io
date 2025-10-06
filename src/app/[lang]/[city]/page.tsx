import { Metadata } from "next";
import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotTopics from "@/components/HotTopics";
import MainContent from "@/components/ItineraryDisplay";
import ItineraryGenerator from "@/components/ItineraryGenerator";
import { capitalizeFirstLetterOfCity } from "@/helpers/captalizeAllFirstWord";
import { Locale } from "@/i18nConfig";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function generateMetadata({
  params : { city, lang },
}: Readonly<{
  params: { city: string, lang: Locale }
}>): Promise<Metadata> {
  const decodedCity = decodeURIComponent(city);
  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);
  const title = `Roteiro de viagem em ${capitalizedCity} - Pontos turísticos e atrações imperdíveis`;
  const description = `Explore ${capitalizedCity} com um roteiro personalizado, incluindo pontos turísticos, dicas de viagem e atrações culturais. Planeje sua viagem com facilidade.`;
  const pageUrl = `${baseUrl}/${lang}/${decodedCity}`;
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
        "pt-br": `${baseUrl}/pt-br/${decodedCity}`,
        "en": `${baseUrl}/en/${decodedCity}`,
      }
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Itinerar",
      locale: "pt-br",
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
  params: { city, lang }
}: Readonly<{
  params: { city: string, lang: Locale }
  }>
) {
  const decodedCity = decodeURIComponent(city);
  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="col-span-12 lg:col-span-10 mt-2.5">
          <ItineraryGenerator lang={lang} />
          <MainContent city={capitalizedCity} lang={lang} />
          <HotTopics />
        </main>
        <Advertisement />
      </div>

      <Footer />
    </div>
  );
}
