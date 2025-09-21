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
  // 1. Crie um estado para armazenar o nome da cidade pesquisada
  const [searchedCity, setSearchedCity] = useState('');

  // 2. Crie uma função para lidar com o envio do formulário
  const handleFormSubmit = (formData: FormData) => {
    const city = formData.get('city') as string;
    setSearchedCity(city); // Atualiza o estado com a cidade
    formAction(formData); // Executa a Server Action
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