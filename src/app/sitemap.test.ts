import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it("has no duplicated URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("drops the slugs that are now redirected to another city", () => {
    for (const alias of ["nova-iorque", "amsterdã", "firenze", "hanói"]) {
      expect(urls.some((url) => url.endsWith(`/${alias}`))).toBe(false);
    }
  });

  it("lists both home versions with matching hreflang", () => {
    const languages = {
      "pt-br": "https://itinerar.com.br",
      en: "https://itinerar.com.br/en",
      "x-default": "https://itinerar.com.br",
    };

    expect(entries.find((entry) => entry.url === "https://itinerar.com.br")?.alternates?.languages).toEqual(languages);
    expect(entries.find((entry) => entry.url === "https://itinerar.com.br/en")?.alternates?.languages).toEqual(languages);
  });

  it("links each city page to its other language", () => {
    expect(entries.find((entry) => entry.url === "https://itinerar.com.br/en/roma")?.alternates?.languages).toEqual({
      "pt-br": "https://itinerar.com.br/pt-br/roma",
      en: "https://itinerar.com.br/en/roma",
      "x-default": "https://itinerar.com.br/pt-br/roma",
    });
  });
});
