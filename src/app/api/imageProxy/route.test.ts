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
  });
});
