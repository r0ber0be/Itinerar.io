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
});
