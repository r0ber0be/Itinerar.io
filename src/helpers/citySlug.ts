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
