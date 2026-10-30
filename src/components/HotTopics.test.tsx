import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import { TranslationProvider } from "./providers/TranslationProvider";
import HotTopics from "./HotTopics";

vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

function renderTopics(lang?: string) {
  return renderToStaticMarkup(
    <TranslationProvider dictionary={en}>
      <HotTopics lang={lang} />
    </TranslationProvider>,
  );
}

describe("HotTopics", () => {
  it("links each featured city, with a descriptive image, in the given language", () => {
    vi.mocked(useParams).mockReturnValue({});

    const html = renderTopics("en");

    expect(html).toContain(`<h2 class="text-2xl md:text-3xl font-bold mt-12 mb-5">${en.featuredRoutes}</h2>`);
    expect(html).toContain('href="/en/paris"');
    expect(html).toContain('href="/en/roma"');
    expect(html).toContain('href="/en/jericoacoara"');
    expect(html).toContain('alt="A Torre Eiffel em Paris');
    expect(html).toContain("motion-safe:group-hover:scale-105");
    expect(html.match(/class="card/g)).toHaveLength(3);
  });

  it.each([
    [{ lang: "en" }, "/en/paris"],
    [{ lang: ["en", "extra"] }, "/en/paris"],
    [{}, "/pt-br/paris"],
    [null, "/pt-br/paris"],
  ])("takes the language from the route params %o when no prop is given", (params, href) => {
    vi.mocked(useParams).mockReturnValue(params as ReturnType<typeof useParams>);

    expect(renderTopics()).toContain(`href="${href}"`);
  });
});
