import Advertisement from "@/components/Advertisement";
import Benefits from "@/components/Benefits";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HotTopics from "@/components/HotTopics";
import HowItWorks from "@/components/HowItWorks";
import ItineraryGenerator from "@/components/ItineraryGenerator";
import { Locale } from "@/i18nConfig";

export default async function Home({ 
  params: { lang },
}: Readonly<{ params: { lang: Locale }}>) {

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="col-span-12 lg:col-span-10 mt-2.5">
          <ItineraryGenerator lang={lang} />
          {/* SEÇÃO HERO COM CONTEÚDO */}
          <Hero />

          {/* COMO FUNCIONA */}
          <HowItWorks />

          {/* LOCAIS POPULARES */}
          <HotTopics />

          {/* BENEFÍCIOS */}
          <Benefits />

          {/* SEO CONTENT */}
          <Discover />
        </main>
        <Advertisement />
      </div>

      <Footer />
    </div>
  );
}
