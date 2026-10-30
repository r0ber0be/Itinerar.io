"use client";

import { useTranslation } from "./providers/TranslationProvider";

export default function SearchButton({ pending = false }: Readonly<{ pending?: boolean }>) {
  const dictionary = useTranslation();

  return (
    <button
      type="submit"
      aria-busy={pending}
      className="shrink-0 h-12 rounded-2xl px-8 w-full sm:w-auto font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-busy:cursor-progress"
    >
      {pending ? dictionary.searchingButton : dictionary.searchButton}
    </button>
  )
}
