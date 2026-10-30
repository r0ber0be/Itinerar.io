// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import ptBr from "@/dictionaries/pt-br.json";
import { TranslationProvider } from "./providers/TranslationProvider";
import ItineraryGenerator from "./ItineraryGenerator";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

const push = vi.fn();

beforeEach(() => {
  push.mockReset();
  vi.mocked(useRouter).mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);
  vi.mocked(usePathname).mockReturnValue("/pt-br");
});

afterEach(cleanup);

function renderGenerator(lang = "pt-br") {
  render(
    <TranslationProvider dictionary={ptBr}>
      <ItineraryGenerator lang={lang} />
    </TranslationProvider>,
  );
  return screen.getByRole("searchbox", { name: ptBr.searchPlaceholder }) as HTMLInputElement;
}

async function search(input: HTMLInputElement, value: string) {
  fireEvent.change(input, { target: { value } });
  await act(async () => {
    fireEvent.submit(input.form!);
  });
}

describe("ItineraryGenerator", () => {
  it("exposes a labelled search form with a submit button", () => {
    const input = renderGenerator();

    expect(screen.getByRole("search")).toBeTruthy();
    expect(input.required).toBe(true);
    expect(input.maxLength).toBe(60);
    expect(screen.getByRole("button", { name: ptBr.searchButton }).getAttribute("type")).toBe("submit");
  });

  it("navigates to the hyphenated, lowercase city in the current language", async () => {
    const input = renderGenerator("en");

    await search(input, "  São Paulo ");

    expect(push).toHaveBeenCalledWith("/en/são-paulo");
  });

  it("goes to the language home when the form has no city field", async () => {
    const input = renderGenerator();
    const form = input.form!;
    input.remove();

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(push).toHaveBeenCalledWith("/pt-br/");
  });

  it("shows an alert instead of searching for names longer than 60 characters", async () => {
    const input = renderGenerator();
    input.removeAttribute("maxLength");

    await search(input, "a".repeat(61));

    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toBe(ptBr.cityTooLong);
  });

  it("keeps the searched city in the field on its page", () => {
    vi.mocked(usePathname).mockReturnValue("/pt-br/rio-de-janeiro");

    expect(renderGenerator().value).toBe("Rio De Janeiro");
  });

  it("keeps the typed city in the field after searching", async () => {
    const input = renderGenerator();

    await search(input, "Roma");

    expect(input.value).toBe("Roma");
  });
});
