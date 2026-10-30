import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { usePathname } from "next/navigation";
import ptBr from "@/dictionaries/pt-br.json";
import { TranslationProvider } from "./providers/TranslationProvider";
import Header from "./Header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function renderHeader(pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);

  return renderToStaticMarkup(
    <TranslationProvider dictionary={ptBr}>
      <Header />
    </TranslationProvider>,
  );
}

describe("Header", () => {
  it("renders on the server with the logo, a labelled language menu and an empty typing title", () => {
    const html = renderHeader("/pt-br");

    expect(html).toContain("<header");
    expect(html).toContain("Itinerar</span>");
    expect(html).toContain('<svg aria-hidden="true" focusable="false"');
    expect(html).toContain('<nav aria-label="Idioma / Language"');
    // A linha da cidade sai vazia do servidor, mas com altura reservada.
    expect(html).toContain('<span aria-hidden="true" class="block min-h-[1lh] text-accent"><span class="border-r-2 border-current pr-1"></span></span></h1>');
    expect(html).toContain(ptBr.lead);
  });

  it("titles a city page with the city instead of the typing list", () => {
    const html = renderHeader("/pt-br/rio-de-janeiro");

    expect(html).toMatch(/<h1[^>]*>O que fazer em <span class="text-accent">Rio De Janeiro<\/span><\/h1>/);
    expect(html).not.toContain(ptBr.lead);
  });

  it.each([["/pt-br/about"], ["/en/privacy"]])("leaves the h1 to the page itself on %s", (pathname) => {
    expect(renderHeader(pathname)).not.toContain("<h1");
  });
});
