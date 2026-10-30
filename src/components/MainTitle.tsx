'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "./providers/TranslationProvider";
import { cityFromPathname } from "@/helpers/citySlug";

export default function MainTitle() {
  const pathname = usePathname();
  const dictionary = useTranslation();
  const isHome = (pathname?.split("/")[2] ?? "") === "";
  const city = cityFromPathname(pathname);

  // Sobre e Privacidade têm h1 próprio: o cabeçalho não repete outro.
  if (!isHome && !city) {
    return null;
  }

  if (city) {
    return (
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-3 mb-4 break-words">
        { dictionary.mainTitle }{' '}
        <span className="text-accent">{city}</span>
      </h1>
    );
  }

  return <TypingTitle />;
}

function TypingTitle() {
  const dictionary = useTranslation();
  const words = dictionary.mainTitleCities;
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );

  useEffect(() => {
    if (reduceMotion) return;

    if (subIndex === words[index].length + 1 && !deleting) {
      // Uma volta pela lista basta: o título para na última cidade.
      if (index === words.length - 1) return;
      setTimeout(() => setDeleting(true), 3000); // pausa antes de apagar
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    setCurrentWord(reduceMotion ? words[index] : words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <div className="mt-6 mb-8 md:mt-10">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        { dictionary.mainTitle } {` `}
        {/* A digitação muda o texto a cada 150ms; o leitor de tela recebe a lista estática. */}
        <span className="sr-only">{words.join(", ")}</span>
        {/* A cidade fica numa linha com altura reservada, para a busca abaixo não pular enquanto digita. */}
        <span aria-hidden="true" className="block min-h-[1lh] text-accent">
          <span className="border-r-2 border-current pr-1">{currentWord}</span>
        </span>
      </h1>
      <p className="mt-4 max-w-[60ch] text-lg md:text-xl text-muted leading-relaxed">
        { dictionary.lead }
      </p>
    </div>
  )
}
