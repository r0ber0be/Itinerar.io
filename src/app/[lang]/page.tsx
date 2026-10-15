import Benefits from "@/components/Benefits";
import Discover from "@/components/Discover";
import Hero from "@/components/Hero";
import HotTopics from "@/components/HotTopics";
import HowItWorks from "@/components/HowItWorks";
import { Locale } from "@/i18nConfig";
import { Metadata } from "next";
import { WebSite, WithContext } from "schema-dts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

type HomeProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({
  params,
}: Readonly<{ params: HomeProps['params']}>): Promise<Metadata> {
  const { lang } = await params;
  // A raiz "/" serve pt-br, então é ela a URL canônica da home em português.
  const pageUrl = lang === "en" ? `${baseUrl}/en` : baseUrl;

  const alternates = {
    canonical: pageUrl,
    languages: {
      "pt-br": baseUrl,
      en: `${baseUrl}/en`,
      "x-default": baseUrl,
    },
  };

  if (lang !== "en") {
    return { alternates };
  }

  const title = "Itinerar: Amazing travel itineraries for your trip";
  const description = "Discover the best tourist attractions and things to do in any destination, like São Paulo, Paris, London and more. Create personalized travel itineraries with the best tips and sights.";

  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Itinerar",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/assets/og-image.png",
          width: 1200,
          height: 630,
          alt: "Itinerar - Travel Itineraries",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.png"],
    },
  };
}

export default async function Home({ 
  params,
}: Readonly<{ params: HomeProps['params']}>) {
  const { lang } = await params;
  // O Google usa o nome do WebSite da home como nome do site nos resultados, no lugar do domínio.
  const webSiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Itinerar",
    alternateName: "itinerar.com.br",
    url: `${baseUrl}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
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
