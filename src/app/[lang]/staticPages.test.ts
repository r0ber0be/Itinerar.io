import { describe, expect, it } from "vitest";
import { generateMetadata as aboutMetadata } from "./about/page";
import { generateMetadata as privacyMetadata } from "./privacy/page";

const params = (lang: string) => Promise.resolve({ lang });

describe.each([
  ["about", aboutMetadata, "About Itinerar", "Sobre o Itinerar"],
  ["privacy", privacyMetadata, "Privacy Policy", "Política de Privacidade"],
])("%s generateMetadata", (page, generateMetadata, englishTitle, portugueseTitle) => {
  it.each([
    ["en", englishTitle],
    ["pt-br", portugueseTitle],
  ])("uses its own canonical and title for %s", async (lang, title) => {
    const metadata = await generateMetadata({ params: params(lang) });

    expect(metadata.title).toBe(title);
    expect(metadata.alternates).toEqual({
      canonical: `https://itinerar.com.br/${lang}/${page}`,
      languages: {
        "pt-br": `https://itinerar.com.br/pt-br/${page}`,
        en: `https://itinerar.com.br/en/${page}`,
        "x-default": `https://itinerar.com.br/pt-br/${page}`,
      },
    });
  });
});
