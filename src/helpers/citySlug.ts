import { capitalizeFirstLetterOfCity } from "./captalizeAllFirstWord";

// Slugs que já foram publicados no sitemap como duplicatas do mesmo destino.
const CITY_SLUG_ALIASES: Record<string, string> = {
  "nova-iorque": "new-york",
  "amsterdã": "amsterdam",
  "firenze": "florenca",
  "hanói": "hanoi",
};

export function cityNameFromSlug(slug: string) {
  return decodeURIComponent(slug).replaceAll("-", " ");
}

export function toCitySlug(cityName: string) {
  const slug = cityName.trim().toLowerCase().split(/\s+/).join("-");
  return CITY_SLUG_ALIASES[slug] ?? slug;
}

// Rotas de [lang] que não são cidades.
const NON_CITY_PAGES = new Set(["about", "privacy"]);

/** Nome legível da cidade na rota `/<lang>/<cidade>`; `undefined` na home e nas páginas fixas. */
export function cityFromPathname(pathname: string | null) {
  const page = pathname?.split("/")[2];
  if (!page || NON_CITY_PAGES.has(page)) {
    return undefined;
  }
  return capitalizeFirstLetterOfCity(cityNameFromSlug(page));
}
