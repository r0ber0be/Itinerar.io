import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function loadModule({ baseUrl = "https://directions.test/json", apiKey = "maps-key" } = {}) {
  vi.stubEnv("DIRECTIONS_BASE_URL", baseUrl);
  vi.stubEnv("ITINERARIO_KEY_MAPS", apiKey);
  vi.resetModules();
  return import("./directions");
}

function requestedParams(fetchSpy: ReturnType<typeof vi.fn>) {
  return new URL(fetchSpy.mock.calls[0][0] as string).searchParams;
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("getItineraryDirections", () => {
  it("needs at least two places", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { getItineraryDirections } = await loadModule();

    await expect(getItineraryDirections(["a"], "en")).resolves.toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    { baseUrl: "" },
    { apiKey: "" },
  ])("returns null without calling Google when the configuration is missing (%o)", async (config) => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { getItineraryDirections } = await loadModule(config);

    await expect(getItineraryDirections(["a", "b"], "en")).resolves.toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledOnce();
  });

  it("asks for an optimized route through the middle places", async () => {
    const data = { routes: [] };
    const fetchSpy = vi.fn().mockResolvedValue(Response.json(data));
    vi.stubGlobal("fetch", fetchSpy);
    const { getItineraryDirections } = await loadModule();

    await expect(getItineraryDirections(["a", "b", "c", "d"], "pt-br")).resolves.toEqual(data);

    const params = requestedParams(fetchSpy);
    expect(params.get("origin")).toBe("place_id:a");
    expect(params.get("destination")).toBe("place_id:d");
    expect(params.get("waypoints")).toBe("optimize:true|place_id:b|place_id:c");
    expect(params.get("language")).toBe("pt-br");
    expect(params.get("key")).toBe("maps-key");
  });

  it("sends no waypoints for a route with only origin and destination", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(Response.json({ routes: [] }));
    vi.stubGlobal("fetch", fetchSpy);
    const { getItineraryDirections } = await loadModule();

    await getItineraryDirections(["a", "b"], "en");

    expect(requestedParams(fetchSpy).has("waypoints")).toBe(false);
  });

  it("returns null when Google answers with an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500, statusText: "Server Error" })));
    const { getItineraryDirections } = await loadModule();

    await expect(getItineraryDirections(["a", "b"], "en")).resolves.toBeNull();
    expect(console.error).toHaveBeenCalledOnce();
  });
});
