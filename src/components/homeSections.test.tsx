import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import ptBr from "@/dictionaries/pt-br.json";
import { TranslationProvider, useTranslation } from "./providers/TranslationProvider";
import Advertisement from "./Advertisement";
import Discover from "./Discover";
import PinSVG from "./svg/pin";
import StarSVG from "./svg/star";

function renderWithDictionary(element: ReactElement) {
  return renderToStaticMarkup(<TranslationProvider dictionary={ptBr}>{element}</TranslationProvider>);
}

describe("home sections", () => {
  it("renders the discover paragraphs", () => {
    const html = renderWithDictionary(<Discover />);

    expect(html).toContain(ptBr.discover.title);
    expect(html).toContain(ptBr.discover.secondParagraph);
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
