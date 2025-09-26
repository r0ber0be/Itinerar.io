"use client";

import { useTranslation } from "./providers/TranslationProvider";

export default function SearchButton() {
  const dictionary = useTranslation();

  return (
    <div className="grid place-items-center w-full">
      <button
        type="submit"
        className="rounded-2xl px-6 py-3 w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
      >
        {dictionary.searchButton}
      </button>
    </div>
  )
}