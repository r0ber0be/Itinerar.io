// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import ptBr from "@/dictionaries/pt-br.json";
import en from "@/dictionaries/en.json";
import { TranslationProvider } from "./providers/TranslationProvider";
import MainTitle from "./MainTitle";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: reduce }));
}

function renderTitle(dictionary = ptBr) {
  render(
    <TranslationProvider dictionary={dictionary}>
      <MainTitle />
    </TranslationProvider>,
  );
  return screen.getByRole("heading", { level: 1 });
}

const typedWord = (heading: HTMLElement) => heading.querySelector('[aria-hidden="true"]')!.textContent;

async function advance(ms: number, steps = 1) {
  for (let step = 0; step < steps; step++) {
    await act(async () => {
      vi.advanceTimersByTime(ms);
    });
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(usePathname).mockReturnValue("/pt-br");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("MainTitle", () => {
  it("gives screen readers a static list instead of the typing animation", () => {
    // Sem matchMedia (navegadores antigos), a animação segue ligada.
    const heading = renderTitle();

    expect(heading.querySelector(".sr-only")!.textContent).toBe(
      "São Paulo, Paris, Recife, Londres, Buenos Aires, Gramado, Dubai, Istambul, Fortaleza",
    );
    expect(heading.textContent).toContain(ptBr.mainTitle);
  });

  it("types a city, pauses, erases it and moves on to the next one", async () => {
    mockReducedMotion(false);
    const heading = renderTitle();

    await advance(150, 3);
    expect(typedWord(heading)).toBe("São");

    await advance(150, 7);
    expect(typedWord(heading)).toBe("São Paulo");

    await advance(3000);
    await advance(50, 10);
    expect(typedWord(heading)).toBe("");

    await advance(150, 2);
    expect(typedWord(heading)).toBe("Pa");
  });

  it("shows the first city at once and stays still when the user prefers reduced motion", async () => {
    mockReducedMotion(true);
    const heading = renderTitle();

    await advance(0);
    expect(typedWord(heading)).toBe("São Paulo");

    await advance(10_000);
    expect(typedWord(heading)).toBe("São Paulo");
  });

  it("stops on the last city after one pass through the list", async () => {
    mockReducedMotion(false);
    const heading = renderTitle();

    // Cada passo dispara um só timer (digitar, apagar ou a pausa); 300 passos cobrem a lista inteira.
    await advance(3000, 300);
    expect(typedWord(heading)).toBe("Fortaleza");

    await advance(3000, 30);
    expect(typedWord(heading)).toBe("Fortaleza");
  });

  it("lists the cities in the page language", () => {
    const heading = renderTitle(en);

    expect(heading.querySelector(".sr-only")!.textContent).toContain("London");
    expect(heading.textContent).toContain(en.mainTitle);
  });
});
