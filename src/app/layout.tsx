import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Itinerar.io: Roteiros turísticos incríveis para sua viagem',
    template: '%s | Itinerar.io',
  },
  description: 'Descubra os melhores pontos turísticos e o que fazer em qualquer destino, como São Paulo, Paris, Londres e muito mais. Crie roteiros de viagem personalizados com as melhores dicas e atrações.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7271082004651164"></meta>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7271082004651164"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
