import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Locale } from "@/i18nConfig";
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getDictionary } from "@/lib/getDictionary";

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

interface LayoutProps {
  params: Promise<{ lang: Locale }>
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LayoutProps['params'];
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslationProvider dictionary={dictionary}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
