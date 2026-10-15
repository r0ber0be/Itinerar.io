import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type SearchTextBody = { textQuery: string; languageCode: string; maxResultCount: number };

async function loadModule(apiKey = "places-key") {
  vi.stubEnv("PLACES_BASE_URL", "https://places.test/v1/places");
  vi.stubEnv("ITINERARIO_KEY_MAPS", apiKey);
  vi.resetModules();
  return import("./googlePlaces");
}

function lastRequest(fetchSpy: ReturnType<typeof vi.fn>) {
  const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit & { headers: Record<string, string> }];
  return { url, headers: init.headers, body: JSON.parse(init.body as string) as SearchTextBody };
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("getTuristicPlaces", () => {
  it("searches in English for en and returns the places", async () => {
    const places = [{ id: "1" }];
    const fetchSpy = vi.fn().mockResolvedValue(Response.json({ places }));
    vi.stubGlobal("fetch", fetchSpy);
    const { getTuristicPlaces } = await loadModule();

    await expect(getTuristicPlaces("Paris", "en")).resolves.toEqual(places);

    const request = lastRequest(fetchSpy);
    expect(request.url).toBe("https://places.test/v1/places:searchText");
    expect(request.headers["X-Goog-Api-Key"]).toBe("places-key");
    expect(request.headers["X-Goog-FieldMask"].split(",")).toContain("places.addressComponents");
    expect(request.body).toEqual({
      textQuery: "Top tourist attractions and landmarks in Paris",
      languageCode: "en",
      maxResultCount: 9,
    });
  });

  it("searches in Portuguese for any other language", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(Response.json({ places: [] }));
    vi.stubGlobal("fetch", fetchSpy);
    const { getTuristicPlaces } = await loadModule();

    await getTuristicPlaces("Recife", "pt-br");

    expect(lastRequest(fetchSpy).body.textQuery).toBe("Lugares interessantes e pontos turísticos em Recife");
  });

  it("sends an empty key when the API key is not configured", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(Response.json({}));
    vi.stubGlobal("fetch", fetchSpy);
    const { getTuristicPlaces } = await loadModule("");

    await expect(getTuristicPlaces("Recife", "pt-br")).resolves.toEqual([]);
    expect(lastRequest(fetchSpy).headers["X-Goog-Api-Key"]).toBe("");
  });

  it("returns no places when Google answers with an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 403, statusText: "Forbidden" })));
    const { getTuristicPlaces } = await loadModule();

    await expect(getTuristicPlaces("Recife", "pt-br")).resolves.toEqual([]);
    expect(console.error).toHaveBeenCalledOnce();
  });
});
