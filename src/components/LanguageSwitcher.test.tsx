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
});
