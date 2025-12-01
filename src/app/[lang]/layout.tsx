import { Locale } from "@/i18nConfig";
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getDictionary } from "@/lib/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItineraryGenerator from "@/components/ItineraryGenerator";

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
      <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main role="main" className="col-span-12 lg:col-span-12 mt-2.5">
            <ItineraryGenerator lang={lang} />
            {children}
          </ main>
        </div>
      <Footer />
    </div>
    </TranslationProvider>
  );
}