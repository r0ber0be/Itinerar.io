import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

function run(path: string, headers?: Record<string, string>) {
  return proxy(new NextRequest(`https://itinerar.com.br${path}`, { headers }));
}

describe("proxy", () => {
  it.each([
    ["/pt-br/nova-iorque", "/pt-br/new-york"],
    ["/en/amsterd%C3%A3", "/en/amsterdam"],
    ["/pt-br/new%20york", "/pt-br/new-york"],
    ["/pt-br/Paris", "/pt-br/paris"],
    ["/pt-br/new--york", "/pt-br/new-york"],
    ["/en/han%C3%B3i", "/en/hanoi"],
  ])("permanently redirects %s to %s", (path, expected) => {
    const response = run(path);

    expect(response?.status).toBe(308);
    expect(new URL(response!.headers.get("location")!).pathname).toBe(expected);
  });

  it.each([
    "/pt-br",
    "/en/",
    "/pt-br/roma",
    "/pt-br/s%C3%A3o-paulo",
    "/en/about",
    "/pt-br/privacy",
    "/pt-br/roma/extra",
    "/pt-br/%E0%A4%A",
  ])("lets %s through untouched", (path) => {
    expect(run(path)).toBeUndefined();
  });

  it("rewrites paths without locale to the browser language", () => {
    const response = run("/paris", { "accept-language": "en-US,en;q=0.9" });

    expect(response?.headers.get("x-middleware-rewrite")).toBe("https://itinerar.com.br/en/paris");
  });

  it("falls back to pt-br when the browser language is unsupported", () => {
    const response = run("/paris", { "accept-language": "fr-FR" });

    expect(response?.headers.get("x-middleware-rewrite")).toBe("https://itinerar.com.br/pt-br/paris");
  });

  it("falls back to pt-br when the locale matcher rejects the browser language", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = run("/paris", { "accept-language": "*" });

    expect(response?.headers.get("x-middleware-rewrite")).toBe("https://itinerar.com.br/pt-br/paris");
    expect(consoleError).toHaveBeenCalledOnce();
    consoleError.mockRestore();
  });

  it("rewrites the bare root to the home of the browser language", () => {
    const response = run("/", { "accept-language": "pt-BR" });

    expect(response?.headers.get("x-middleware-rewrite")).toBe("https://itinerar.com.br/pt-br/");
  });
});
