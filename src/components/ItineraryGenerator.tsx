"use client"

import "../app/styles/card.css";
import { generateItinerary, ItineraryResult } from "@/app/actions";
import { useActionState, useState } from "react";
import SearchSection from "./SearchSection";
import ResultsSection from "./ResultsSection";

const initialState: ItineraryResult = {
  places: [],
};

export default function ItineraryGenerator() {
  const [state, formAction] = useActionState(generateItinerary, initialState);
  const [searchedCity, setSearchedCity] = useState('');

  const handleFormSubmit = (formData: FormData) => {
    const city = formData.get('city') as string;
    setSearchedCity(city);
    formAction(formData);
  };

  return (
    <section className="w-full">
      <form action={handleFormSubmit}>
        <SearchSection />
      </form>

      <ResultsSection state={state} searchedCity={searchedCity} />
    </section>
  );
}