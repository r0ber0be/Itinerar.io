import { describe, expect, it, vi } from "vitest";
import en from "@/dictionaries/en.json";
import ptBr from "@/dictionaries/pt-br.json";
import { getDictionary } from "./getDictionary";

vi.mock("server-only", () => ({}));

describe("getDictionary", () => {
  it.each([
    ["en", en],
    ["pt-br", ptBr],
  ] as const)("loads the %s dictionary", async (locale, dictionary) => {
    await expect(getDictionary(locale)).resolves.toEqual(dictionary);
  });
});
