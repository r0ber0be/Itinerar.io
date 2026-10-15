import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import ptBr from "@/dictionaries/pt-br.json";
import { TranslationProvider, useTranslation } from "./providers/TranslationProvider";
import Advertisement from "./Advertisement";
import Benefits from "./Benefits";
import Discover from "./Discover";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import PinSVG from "./svg/pin";
import StarSVG from "./svg/star";

function renderWithDictionary(element: ReactElement) {
  return renderToStaticMarkup(<TranslationProvider dictionary={ptBr}>{element}</TranslationProvider>);
}

describe("home sections", () => {
  it("renders the hero copy", () => {
    const html = renderWithDictionary(<Hero />);

    expect(html).toContain(ptBr.hero.title);
    expect(html).toContain(ptBr.hero.subtitle);
  });

  it("lists every benefit", () => {
    const html = renderWithDictionary(<Benefits />);

    expect(html).toContain(ptBr.benefits.title);
    expect(html.match(/<li/g)).toHaveLength(ptBr.benefits.items.length);
  });

  it("renders the discover paragraphs", () => {
    const html = renderWithDictionary(<Discover />);

    expect(html).toContain(ptBr.discover.title);
    expect(html).toContain(ptBr.discover.secondParagraph);
  });

  it("numbers the steps from one", () => {
    const html = renderWithDictionary(<HowItWorks />);

    expect(html).toContain(ptBr.howItWorks.steps[0].title);
    expect(html).toMatch(/>1<\/div>[\s\S]*>2<\/div>[\s\S]*>3<\/div>/);
  });
});

describe("Advertisement", () => {
  it("marks the affiliate link as sponsored and describes the banner", () => {
    const html = renderToStaticMarkup(<Advertisement />);

    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).toContain('alt="Booking.com - Suas férias sonhadas estão a poucas horas de voo"');
  });
});

describe("decorative icons", () => {
  it.each([["pin", PinSVG], ["star", StarSVG]])("hides the %s icon from assistive technology", (_name, Icon) => {
    expect(renderToStaticMarkup(<Icon />)).toMatch(/^<svg aria-hidden="true" focusable="false"/);
  });
});

describe("useTranslation", () => {
  it("fails loudly outside a TranslationProvider", () => {
    function Orphan() {
      useTranslation();
      return null;
    }

    expect(() => renderToStaticMarkup(<Orphan />)).toThrow("useTranslation must be used within a TranslationProvider");
  });
});
