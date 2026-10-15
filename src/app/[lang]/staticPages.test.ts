import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import AboutPage, { generateMetadata as aboutMetadata } from "./about/page";
import PrivacyPolicy, { generateMetadata as privacyMetadata } from "./privacy/page";
import Loading from "./[city]/loading";

describe.each([
  ["about", AboutPage, "About Itinerar", "Sobre o Itinerar"],
  ["privacy", PrivacyPolicy, "Privacy Policy", "Política de Privacidade"],
])("%s page", (_page, Page, englishTitle, portugueseTitle) => {
  it.each([
    ["en", englishTitle],
    ["pt-br", portugueseTitle],
  ])("renders the %s content with a single h1 and its sections", async (lang, title) => {
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ lang }) }));

    expect(html).toContain(`<h1 class="text-3xl md:text-4xl font-bold mb-4">${title}</h1>`);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<section>/g)?.length).toBeGreaterThan(1);
  });
});

describe("city loading", () => {
  it("announces the loading state politely to screen readers", () => {
    const html = renderToStaticMarkup(Loading());

    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
  });
});

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
