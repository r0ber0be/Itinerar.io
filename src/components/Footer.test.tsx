import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Footer", () => {
  it("links the English pages with English labels", () => {
    vi.mocked(usePathname).mockReturnValue("/en/paris");

    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain('href="/en">Home</a>');
    expect(html).toContain('href="/en/privacy">Privacy Policy</a>');
    expect(html).toContain('href="/en/about">About</a>');
    expect(html).toContain(`© ${new Date().getFullYear()} Itinerar - All rights reserved.`);
  });

  it("falls back to Portuguese on the root and spells Início correctly", () => {
    vi.mocked(usePathname).mockReturnValue("/");

    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain('href="/pt-br">Início</a>');
    expect(html).toContain('href="/pt-br/privacy">Política de Privacidade</a>');
    expect(html).toContain('href="/pt-br/about">Sobre</a>');
    expect(html).toContain("Todos os direitos reservados.");
  });
});
