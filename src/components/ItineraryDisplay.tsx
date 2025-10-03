import { fetchItinerary, ItineraryResult } from "@/app/actions";
import ResultsSection from "./ResultsSection";

interface MainContentProps {
  city: string;
  lang: string;
}

export default async function MainContent({ city, lang }: MainContentProps) {
  let itineraryResult: ItineraryResult = { places: [] };

  if(Number(city.length) > 60) {
    itineraryResult = {
      places: [],
      error: "O nome da cidade é muito longo. Por favor, use no máximo 60 caracteres.",
    }
  } else if (Number(city.length) > 2) {
    itineraryResult = await fetchItinerary(city.toLowerCase(), lang);
  } else {
    itineraryResult = {
      places: [],
      error: "O nome da cidade é muito pequena. Por favor, use no minimo 3 caracteres.",
    }
  }

  return (
    <ResultsSection state={itineraryResult} searchedCity={city} />
  )
}