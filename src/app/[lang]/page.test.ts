import { describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import Home, { generateMetadata } from "./page";

describe("home page", () => {
  it("publishes the WebSite structured data so Google shows the site name", async () => {
    const page = await Home({ params: Promise.resolve({ lang: "pt-br" }) }) as ReactElement<{ children: ReactElement<{ type?: string; dangerouslySetInnerHTML?: { __html: string } }>[] }>;
    const [script] = page.props.children;

    expect(script.type).toBe("script");
    expect(script.props.type).toBe("application/ld+json");
    expect(JSON.parse(script.props.dangerouslySetInnerHTML!.__html)).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Itinerar",
      alternateName: "itinerar.com.br",
      url: "https://itinerar.com.br/",
    });
  });
});

const params = (lang: "pt-br" | "en") => Promise.resolve({ lang });

describe("home generateMetadata", () => {
  it("uses the root URL as canonical for pt-br and keeps the inherited Portuguese title", async () => {
    const metadata = await generateMetadata({ params: params("pt-br") });

    expect(metadata.title).toBeUndefined();
    expect(metadata.alternates).toEqual({
      canonical: "https://itinerar.com.br",
      languages: {
        "pt-br": "https://itinerar.com.br",
        en: "https://itinerar.com.br/en",
        "x-default": "https://itinerar.com.br",
      },
    });
  });

  it("serves English metadata with its own canonical for en", async () => {
    const metadata = await generateMetadata({ params: params("en") });

    expect(metadata.title).toEqual({ absolute: "Itinerar: Amazing travel itineraries for your trip" });
    expect(metadata.description).toMatch(/^Discover the best tourist attractions/);
    expect(metadata.alternates?.canonical).toBe("https://itinerar.com.br/en");
    expect(metadata.openGraph).toMatchObject({ url: "https://itinerar.com.br/en", locale: "en_US" });
  });
});
