import { describe, expect, it } from "vitest";
import manifest from "./manifest";
import robots from "./robots";

describe("manifest", () => {
  it("describes the installable Itinerar app with opaque icons", () => {
    const result = manifest();

    expect(result).toMatchObject({ name: "Itinerar", start_url: "/", display: "standalone" });
    expect(result.icons?.map((icon) => icon.src)).toEqual([
      "/assets/web-app-manifest-192x192.png",
      "/assets/web-app-manifest-192x192.png",
      "/assets/web-app-manifest-512x512.png",
      "/assets/web-app-manifest-512x512.png",
    ]);
  });
});

describe("robots", () => {
  it("allows every crawler and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://itinerar.com.br/sitemap.xml",
    });
  });
});
