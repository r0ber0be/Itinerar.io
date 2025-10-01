import { fetchItinerary, ItineraryResult } from "@/app/actions";
import ResultsSection from "./ResultsSection";
import { capitalizeFirstLetterOfCity } from "@/helpers/captalizeAllFirstWord";

interface MainContentProps {
  city: string;
  lang: string;
}

export default async function MainContent({ city, lang }: MainContentProps) {
  let itineraryResult: ItineraryResult = { places: [] };

  if (city) {
    itineraryResult = await fetchItinerary(city.toLowerCase(), lang);
  }

  return (
    <ResultsSection state={itineraryResult} searchedCity={city} />
  )
}