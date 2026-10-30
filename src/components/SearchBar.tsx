"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "./providers/TranslationProvider"
import MagnifyingGlassSVG from "./svg/magnifyingGlass";
import { cityFromPathname } from "@/helpers/citySlug";

export default function SearchBar() {
  const dictionary = useTranslation();
  // Na página da cidade, o campo mostra o que foi buscado; a key remonta o campo a cada nova cidade.
  const city = cityFromPathname(usePathname()) ?? "";
  return (
    <div className="relative w-full min-w-0">
      <label htmlFor="city-search" className="sr-only">{dictionary.searchPlaceholder}</label>
      <MagnifyingGlassSVG />
      <input
        key={city}
        id="city-search"
        type="search"
        name="q"
        enterKeyHint="search"
        autoComplete="off"
        defaultValue={city}
        placeholder={dictionary.searchPlaceholder}
        maxLength={60}
        className="w-full h-12 pl-10 pr-4 rounded-2xl border border-(--search-border) focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        required
      />
    </div>
  )
}
