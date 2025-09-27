import { fetchItinerary, ItineraryResult } from "@/app/actions";
import ResultsSection from "./ResultsSection";

interface MainContentProps {
  searchParams?: { [key: string]: string | string[] | undefined };
  lang: string;
}

export default async function MainContent({ searchParams, lang }: MainContentProps) {
  const cityQuery = searchParams?.q as string;
  let itineraryResult: ItineraryResult = { places: [] };

  if (cityQuery) {
    const city = cityQuery.toLowerCase()
    itineraryResult = await fetchItinerary(city, lang);
  }

  return (
    <ResultsSection state={itineraryResult} searchedCity={cityQuery} />
  )
}