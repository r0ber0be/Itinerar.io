import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

function get(photoName?: string) {
  const url = photoName === undefined
    ? "https://itinerar.com.br/api/imageProxy"
    : `https://itinerar.com.br/api/imageProxy?photoName=${encodeURIComponent(photoName)}`;
  return GET(new Request(url));
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("imageProxy GET", () => {
  it("rejects a missing photoName", async () => {
    const response = await get();
    expect(response.status).toBe(400);
  });

  it.each([
    "../../secret",
    "places/abc/photos/def/extra",
    "https://evil.example/x",
    "places/abc",
    "places/abc/photos/def?key=leak",
  ])("rejects the malformed photoName %s without calling Google", async (photoName) => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await get(photoName);

    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("forwards a well-formed photoName to the Places media endpoint", async () => {
    vi.stubEnv("ITINERARIO_KEY_MAPS", "test-key");
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response("img", { status: 200, headers: { "content-type": "image/jpeg" } }),
    );
    vi.stubGlobal("fetch", fetchSpy);

    const response = await get("places/ChIJ_abc-123/photos/Ael-ref_456");

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy.mock.calls[0][0]).toContain("places/ChIJ_abc-123/photos/Ael-ref_456/media");
    expect(response.headers.get("content-type")).toBe("image/jpeg");
    expect(response.headers.get("cache-control")).toBe("public, max-age=86400, s-maxage=2592000");
  });

  it("answers 500 without calling Google when the API key is not configured", async () => {
    vi.stubEnv("ITINERARIO_KEY_MAPS", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await get("places/abc/photos/def");

    expect(response.status).toBe(500);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("forwards the Google error status", async () => {
    vi.stubEnv("ITINERARIO_KEY_MAPS", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 404 })));

    const response = await get("places/abc/photos/def");

    expect(response.status).toBe(404);
  });

  it("falls back to a generic content type when Google sends none", async () => {
    vi.stubEnv("ITINERARIO_KEY_MAPS", "test-key");
    const body = new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    body.headers.delete("content-type");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(body));

    const response = await get("places/abc/photos/def");

    expect(response.headers.get("content-type")).toBe("application/octet-stream");
  });

  it("answers 500 when the request to Google fails", async () => {
    vi.stubEnv("ITINERARIO_KEY_MAPS", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await get("places/abc/photos/def");

    expect(response.status).toBe(500);
    expect(consoleError).toHaveBeenCalledOnce();
    consoleError.mockRestore();
  });
});
