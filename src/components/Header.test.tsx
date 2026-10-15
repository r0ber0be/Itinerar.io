import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { usePathname } from "next/navigation";
import ptBr from "@/dictionaries/pt-br.json";
import { TranslationProvider } from "./providers/TranslationProvider";
import Header from "./Header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Header", () => {
  it("renders on the server with the logo, a labelled language menu and an empty typing title", () => {
    vi.mocked(usePathname).mockReturnValue("/pt-br/paris");

    const html = renderToStaticMarkup(
      <TranslationProvider dictionary={ptBr}>
        <Header />
      </TranslationProvider>,
    );

    expect(html).toContain("<header");
    expect(html).toContain("Itinerar</span>");
    expect(html).toContain('<svg aria-hidden="true" focusable="false"');
    expect(html).toContain('<nav aria-label="Idioma / Language"');
    expect(html).toContain('<span aria-hidden="true" class="text-blue-700');
    expect(html).toMatch(/<span aria-hidden="true" class="[^"]*"><\/span><\/h1>/);
  });
});
