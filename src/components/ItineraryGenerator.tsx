"use client";

import { useRouter } from "next/navigation";
import SearchSection from "./SearchSection";
import { FormEvent, useState, useTransition } from "react";
import { useTranslation } from "./providers/TranslationProvider";

export default function ItineraryGenerator({ lang }: Readonly<{ lang: string }>) {
  const router = useRouter();
  const dictionary = useTranslation();
  const [error, setError] = useState("");
  // A transição fica pendente até a página da cidade renderizar: o botão mostra "Buscando…" nesse intervalo.
  const [pending, startTransition] = useTransition();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    // Sem o reset automático do `action`, o campo mantém a cidade digitada enquanto a página carrega.
    event.preventDefault();
    if (pending) return;

    const query = new FormData(event.currentTarget).get("q");
    const city = typeof query === "string" ? query.trim() : "";

    if (Number(city.length) > 60) {
      setError(dictionary.cityTooLong); // Para a execução, não faz a busca
    }

    else {
      setError("");
      const formattedCity = city.replaceAll(" ", "-").toLowerCase();
      startTransition(() => router.push(`/${lang}/${formattedCity}`));
    }
  }

  return (
    <section className="w-full">
      <form onSubmit={handleSearch} role="search">
        <SearchSection pending={pending} />
        { error && <p role="alert" className="text-red-700 dark:text-red-400 mt-2">{ error }</p> }
      </form>
    </section>
  );
}
