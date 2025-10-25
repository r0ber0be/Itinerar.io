import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
const title = "Itinerar: Roteiros turísticos incríveis para sua viagem";
const description = "Descubra os melhores pontos turísticos e o que fazer em qualquer destino, como São Paulo, Paris, Londres e muito mais. Crie roteiros de viagem personalizados com as melhores dicas e atrações.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Itinerar",
  },
  description,
  category: "travel",
  keywords: ["roteiro de viagem", "turismo", "pontos turísticos", "viagem", "destinos", "atrações turísticas"],
  authors: [{ name: "Robson Lopes Cavalcante", url: "https://www.linkedin.com/in/robson-lopesc/" }],
  verification: {
    me: "https://www.linkedin.com/in/robson-lopesc/",
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title,
    description,
    url: `${baseUrl}`,
    siteName: "Itinerar",
    locale: "pt-br",
    type: "website",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Itinerar - Roteiros de Viagem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseKey = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
  return (
    <html lang="pt-br">
      <head>
        <meta name="apple-mobile-web-app-title" content="Itinerar" />
        <meta name="google-adsense-account" content={adsenseKey}></meta>
        <Script
          id="adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseKey}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
