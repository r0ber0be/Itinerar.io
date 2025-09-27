import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotTopics from "@/components/HotTopics";
import MainContent from "@/components/ItineraryDisplay";
import ItineraryGenerator from "@/components/ItineraryGenerator";
import { Locale } from "@/i18nConfig";

export default async function Home({ 
  params,
  searchParams 
}: {
  params: { lang: Locale },
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const sParams = await searchParams;
  const { lang } = await params;

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="col-span-12 lg:col-span-10 mt-2.5">
          <ItineraryGenerator />
          <MainContent searchParams={sParams} lang={lang} />
          <HotTopics />
        </main>
        <Advertisement />
      </div>

      <Footer />
    </div>
  );
}
