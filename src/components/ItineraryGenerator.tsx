"use client";

import { useRouter } from "next/navigation";
import SearchSection from "./SearchSection";
import { useState } from "react";

export default function ItineraryGenerator({ lang }: { lang: string }) {
  const router = useRouter();
   const [error, setError] = useState("");

  function handleSearch(formData: FormData) {
    const city = formData.get("q")?.toString().trim()!;

    if (Number(city.length) > 60) {
      setError('O nome da cidade não pode ter mais de 60 caracteres.');
      return; // Para a execução, não faz a busca
    }

    if (city) {
      router.push(`/${lang}/${encodeURIComponent(city.toLowerCase())}`);
    }
  }

  return (
    <section className="w-full">
      <form action={handleSearch}>
        <SearchSection />
        { error && <p className="text-red-500 mt-2 text-center">{ error }</p> }
      </form>
    </section>
  );
}