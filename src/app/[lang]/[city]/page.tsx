import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotTopics from "@/components/HotTopics";
import MainContent from "@/components/ItineraryDisplay";
import ItineraryGenerator from "@/components/ItineraryGenerator";
import { capitalizeFirstLetterOfCity } from "@/helpers/captalizeAllFirstWord";
import { Locale } from "@/i18nConfig";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: Locale; city: string }>,
}

export async function generateMetadata({ 
  params
}: Readonly<{
  params: PageProps['params']
}>): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);

  return {
    title: `Roteiro de viagem em ${capitalizedCity} - Pontos turísticos e atrações imperdíveis`,
    description: `Explore ${decodedCity} com um roteiro personalizado, incluindo pontos turísticos, dicas de viagem e atrações culturais. Planeje sua viagem com facilidade.`,
    openGraph: {
      
    }
  }
}

export default async function Home({ 
  params
}: Readonly<{
  params: PageProps['params']
}>) {
  const { lang, city } = await params;
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
