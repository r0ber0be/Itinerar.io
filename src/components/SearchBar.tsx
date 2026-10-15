"use client";

import { useTranslation } from "./providers/TranslationProvider"
import MagnifyingGlassSVG from "./svg/magnifyingGlass";

export default function SearchBar() {
  const dictionary = useTranslation();
  return (
    <div className="w-full grid place-items-center mb-3">
      <div className="relative w-full md:w-2/3 lg:w-2/3">
        <label htmlFor="city-search" className="sr-only">{dictionary.searchPlaceholder}</label>
        <MagnifyingGlassSVG />
        <input
          id="city-search"
          type="search"
          name="q"
          enterKeyHint="search"
          autoComplete="off"
          placeholder={dictionary.searchPlaceholder}
          maxLength={60}
          className="w-full px-10 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-400"
          required
        />
      </div>
    </div>
  )
}