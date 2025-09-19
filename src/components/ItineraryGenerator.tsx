"use client"

import { generateItinerary, ItineraryResult } from "@/app/actions";
import { useActionState } from "react";
import SearchSection from "./SearchSection";
import ResultsSection from "./ResultsSection";

const initialState: ItineraryResult = {
  places: [],
};

export default function ItineraryGenerator() {
  const [state, formAction] = useActionState(generateItinerary, initialState);

  return (
    <section className="w-full">
      <form action={formAction}>
        <SearchSection />
      </form>

      <div className="mt-8">
        <ResultsSection state={state} />
      </div>
    </section>
  );
}