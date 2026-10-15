import { describe, expect, it, vi } from "vitest";
import type { ReactElement, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RootLayout from "./layout";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

type Element = ReactElement<{ children?: ReactNode }>;

describe("RootLayout", () => {
  it("renders Vercel Analytics and Speed Insights next to the page", () => {
    const html = RootLayout({ children: <p>page</p> }) as Element;
    const [, body] = html.props.children as Element[];
    const bodyChildren = body.props.children as Element[];

    expect(bodyChildren.map((child) => child.type)).toEqual(["p", SpeedInsights, Analytics]);
  });

  it.each([
    ["", false],
    ["ca-pub-123", true],
  ])("loads AdSense only when its client id is configured (%j)", (adsenseKey, loaded) => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID", adsenseKey);

    const html = RootLayout({ children: null }) as Element;
    const [head] = html.props.children as Element[];
    const adsense = (head.props.children as (Element | null)[]).at(-1);

    if (loaded) {
      const [meta] = adsense!.props.children as ReactElement<{ content: string }>[];
      expect(meta.props.content).toBe(adsenseKey);
    } else {
      expect(adsense).toBeNull();
    }
    vi.unstubAllEnvs();
  });

  it("points the icons to opaque PNGs Google can show in search results", () => {
    const html = RootLayout({ children: null }) as Element;
    const [head] = html.props.children as Element[];
    const links = (head.props.children as (ReactElement<{ rel?: string; href?: string }> | null)[])
      .filter((child) => child?.type === "link")
      .map((child) => `${child!.props.rel} ${child!.props.href}`);

    expect(links).toContain("icon /favicon.ico");
    expect(links).toContain("apple-touch-icon /assets/web-app-manifest-192x192.png");
  });
});
