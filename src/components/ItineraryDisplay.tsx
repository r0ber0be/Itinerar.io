import { fetchItinerary, ItineraryResult } from "@/app/actions";
import ResultsSection from "./ResultsSection";

interface MainContentProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function MainContent({ searchParams }: MainContentProps) {
  const cityQuery = searchParams?.q as string;
  let itineraryResult: ItineraryResult = { places: [] };

  if (cityQuery) {
    itineraryResult = await fetchItinerary(cityQuery);
  }

  return (
    <ResultsSection state={itineraryResult} searchedCity={cityQuery} />
  )
}