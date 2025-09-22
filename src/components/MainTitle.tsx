'use client'

import { useEffect, useState } from "react";
import { useTranslation } from "./providers/TranslationProvider";

export default function MainTitle() {
  const words = ["São Paulo", "Paris", "Recife", "Londres", "Buenos Aires", "Gramado", "Dubai", "Istambul", "Fortaleza"];
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const dictionary = useTranslation();

  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

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
    setCurrentWord(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <h1 className="text-3xl md:text-5xl mt-3 mb-2">
      { dictionary.mainTitle } {` `}
      <span className="text-blue-400 border-r-2 border-blue-400 pr-1">{currentWord}</span>
    </h1>
  )
}