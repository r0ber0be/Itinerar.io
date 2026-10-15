import { describe, expect, it, vi } from "vitest";
import type { ReactElement, ReactNode } from "react";
import ptBr from "@/dictionaries/pt-br.json";
import { getDictionary } from "@/lib/getDictionary";
import LangLayout, { generateStaticParams } from "./layout";

vi.mock("@/lib/getDictionary", () => ({
  getDictionary: vi.fn(),
}));

type Element = ReactElement<{ children?: ReactNode; dictionary?: unknown; lang?: string; href?: string; id?: string }>;

describe("lang layout generateStaticParams", () => {
  it("prerenders every supported locale", () => {
    expect(generateStaticParams()).toEqual([{ lang: "pt-br" }, { lang: "en" }]);
  });
});

describe("LangLayout", () => {
  it("provides the locale dictionary and marks the content with the page language", async () => {
    vi.mocked(getDictionary).mockResolvedValue(ptBr);

    const provider = await LangLayout({ children: null, params: Promise.resolve({ lang: "en" }) }) as Element;
    const wrapper = provider.props.children as Element;
    const [skipLink, , content] = wrapper.props.children as Element[];
    const main = content.props.children as Element;

    expect(getDictionary).toHaveBeenCalledWith("en");
    expect(provider.props.dictionary).toBe(ptBr);
    expect(wrapper.props.lang).toBe("en");
    expect(skipLink.props).toMatchObject({ href: "#main-content", children: ptBr.skipToContent });
    expect(main.props.id).toBe("main-content");
  });
});
