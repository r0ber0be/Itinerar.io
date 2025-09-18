import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotTopics from "@/components/HotTopics";
import SearchSection from "@/components/SearchSection";
import { getItineraryDirections } from "@/lib/directions";
import { getTuristicPlaces } from "@/lib/googlePlaces";

export default async function Home() {
  await getTuristicPlaces()
  // await getItineraryDirections(["ChIJP6FKmNV_mQAR3gKVAdeEyZ0", "ChIJA0tgM6PVmwARYbqb7Eo9VO4"])
  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="col-span-12 lg:col-span-10 mt-2.5">
          <SearchSection />
          { /* HOT TOPIcs */ }
          <HotTopics />
        </main>
        
        { /* Coluna lateral direita (ADS)*/ }
        <Advertisement />
      </div>

      <Footer />
    </div>
  );
}
