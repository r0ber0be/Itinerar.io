import { i18n, Locale } from "@/i18nConfig";
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getDictionary } from "@/lib/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItineraryGenerator from "@/components/ItineraryGenerator";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Readonly<Props>) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as Locale);
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      <div lang={lang} className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        {dictionary.skipToContent}
      </a>
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
        <div className="w-full min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main id="main-content" tabIndex={-1} className="min-w-0 col-span-12 lg:col-span-12 mt-2.5 focus:outline-none">
            <ItineraryGenerator lang={lang} />
            {children}
          </ main>
        </div>
      <Footer />
    </div>
    </TranslationProvider>
  );
}