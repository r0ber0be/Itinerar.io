"use client";

import { useTranslation } from "./providers/TranslationProvider"
import MagnifyingGlassSVG from "./svg/magnifyingGlass";

export default function SearchBar() {
  const dictionary = useTranslation();
  return (
    <div className="w-full grid place-items-center mb-3">
      <div className="relative w-full md:w-2/3 lg:w-2/3">
        <MagnifyingGlassSVG />
        <input
          type="text"
          name="q"
          placeholder={dictionary.searchPlaceholder}
          className="w-full px-10 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
    </div>
  )
}