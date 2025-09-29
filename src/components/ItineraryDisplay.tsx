import { fetchItinerary, ItineraryResult } from "@/app/actions";
import ResultsSection from "./ResultsSection";
import { capitalizeFirstLetterOfCity } from "@/helpers/captalizeAllFirstWord";

interface MainContentProps {
  city: string;
  lang: string;
}

export default async function MainContent({ city, lang }: MainContentProps) {
  let itineraryResult: ItineraryResult = { places: [] };
  const decodedCity = decodeURIComponent(city);

  if (city) {
    itineraryResult = await fetchItinerary(city.toLowerCase(), lang);
  }

  const capitalizedCity = capitalizeFirstLetterOfCity(decodedCity);

  return (
    <ResultsSection state={itineraryResult} searchedCity={capitalizedCity} />
  )
}