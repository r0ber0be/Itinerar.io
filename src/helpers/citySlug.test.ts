import { describe, expect, it } from "vitest";
import { cityFromPathname, cityNameFromSlug, toCitySlug } from "./citySlug";

describe("cityNameFromSlug", () => {
  it("turns hyphens into spaces", () => {
    expect(cityNameFromSlug("rio-de-janeiro")).toBe("rio de janeiro");
  });

  it("decodes percent-encoded characters", () => {
    expect(cityNameFromSlug("s%C3%A3o-paulo")).toBe("são paulo");
    expect(cityNameFromSlug("new%20york")).toBe("new york");
  });
});

describe("toCitySlug", () => {
  it("lowercases and joins words with single hyphens", () => {
    expect(toCitySlug("  New   York ")).toBe("new-york");
  });

  it("keeps accents of cities without an alias", () => {
    expect(toCitySlug("São Paulo")).toBe("são-paulo");
  });

  it.each([
    ["Nova Iorque", "new-york"],
    ["Amsterdã", "amsterdam"],
    ["Firenze", "florenca"],
    ["Hanói", "hanoi"],
  ])("maps the duplicate %s to %s", (cityName, expected) => {
    expect(toCitySlug(cityName)).toBe(expected);
  });
});

describe("cityFromPathname", () => {
  it("reads the readable city name from a city route", () => {
    expect(cityFromPathname("/pt-br/rio-de-janeiro")).toBe("Rio De Janeiro");
    expect(cityFromPathname("/en/s%C3%A3o-paulo")).toBe("São Paulo");
  });

  it.each([["/pt-br"], ["/en/"], ["/"], ["/pt-br/about"], ["/en/privacy"]])("has no city on %s", (pathname) => {
    expect(cityFromPathname(pathname)).toBeUndefined();
  });

  it("has no city without a pathname", () => {
    expect(cityFromPathname(null)).toBeUndefined();
  });
});
