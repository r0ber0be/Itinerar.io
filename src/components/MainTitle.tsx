'use client'

import { useEffect, useState } from "react";
import { useTranslation } from "./providers/TranslationProvider";

export default function MainTitle() {
  const words = ["São Paulo", "Paris", "Recife", "Londres", "Buenos Aires", "Gramado", "Dubai", "Istambul", "Fortaleza"];
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
  const dictionary = useTranslation();

  useEffect(() => {
    if (reduceMotion) return;

    if (subIndex === words[index].length + 1 && !deleting) {
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
    <h1 className="text-3xl md:text-5xl mt-3 mb-2 break-words">
      { dictionary.mainTitle } {` `}
      {/* A digitação muda o texto a cada 150ms; o leitor de tela recebe a lista estática. */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="text-blue-700 border-r-2 border-blue-700 dark:text-blue-400 dark:border-blue-400 pr-1">{currentWord}</span>
    </h1>
  )
}