import { Locale } from "@/i18nConfig";
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getDictionary } from "@/lib/getDictionary";

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
      {children}
    </TranslationProvider>
  );
}