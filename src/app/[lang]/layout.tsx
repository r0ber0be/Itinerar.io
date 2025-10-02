import { Locale } from "@/i18nConfig";
import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getDictionary } from "@/lib/getDictionary";

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      {children}
    </TranslationProvider>
  );
}