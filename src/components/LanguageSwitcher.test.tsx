import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("LanguageSwitcher", () => {
  it("links to the same page in every locale", () => {
    vi.mocked(usePathname).mockReturnValue("/en/paris");

    const html = renderToStaticMarkup(<LanguageSwitcher />);

    expect(html).toContain('href="/pt-br/paris"');
    expect(html).toContain('href="/en/paris"');
  });

  it("names each language and marks the current one for assistive technology", () => {
    vi.mocked(usePathname).mockReturnValue("/en/paris");

    const html = renderToStaticMarkup(<LanguageSwitcher />);

    expect(html).toMatch(/<a[^>]*hrefLang="en"[^>]*lang="en"[^>]*aria-current="page"[^>]*>EN<span class="sr-only"> \(English\)<\/span><\/a>/);
    expect(html).toMatch(/<a[^>]*hrefLang="pt-br"[^>]*lang="pt-br"(?![^>]*aria-current)[^>]*>BR<span class="sr-only"> \(Português\)<\/span><\/a>/);
    // WCAG 2.5.3: o nome acessível precisa conter o texto visível, então não pode haver aria-label.
    expect(html).not.toContain("aria-label");
    expect(html).toContain('<div aria-hidden="true"');
  });

  it("falls back to the root when the pathname is not available yet", () => {
    vi.mocked(usePathname).mockReturnValue(null as unknown as string);

    const html = renderToStaticMarkup(<LanguageSwitcher />);

    expect(html.match(/href="\/"/g)).toHaveLength(2);
    expect(html).not.toContain("aria-current");
  });
});
