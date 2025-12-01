import Benefits from "@/components/Benefits";
import Discover from "@/components/Discover";
import Hero from "@/components/Hero";
import HotTopics from "@/components/HotTopics";
import HowItWorks from "@/components/HowItWorks";
import { Locale } from "@/i18nConfig";

type HomeProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function Home({ 
  params,
}: Readonly<{ params: HomeProps['params']}>) {
  const { lang } = await params;

  return (
    <>
      <Hero />
      {/* COMO FUNCIONA */}
      <HowItWorks />
      {/* LOCAIS POPULARES */}
      <HotTopics lang={lang} />
      {/* BENEFÍCIOS */}
      <Benefits />
      {/* SEO */}
      <Discover />
    </>
  );
}
