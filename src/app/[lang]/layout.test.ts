import { describe, expect, it, vi } from "vitest";
import { generateStaticParams } from "./layout";

vi.mock("@/lib/getDictionary", () => ({
  getDictionary: vi.fn(),
}));

describe("lang layout generateStaticParams", () => {
  it("prerenders every supported locale", () => {
    expect(generateStaticParams()).toEqual([{ lang: "pt-br" }, { lang: "en" }]);
  });
});
