import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["pt-br", "en"];

  const hotTopicsCities = [
    "paris", 
    "roma", 
    "jericoacoara"
  ];

  const mostSearchedCities = [
    "new-york",
    "nova-iorque",
    "londres",
    "toquio",
    "sao-paulo",
    "rio-de-janeiro",
    "lisboa",
    "barcelona",
    "dubai",
    "bangkok",
    "istambul",
    "sydney",
    "cidade-do-cabo",
    "amsterda",
    "buenos-aires",
    "firenze",
    "orlando",
    "miami",
    "cancun",
    "punta-cana",
    "santiago",
    "cusco",
    "cartagena",
    "madri",
    "florenca",
    "veneza",
    "berlim",
    "praga",
    "budapeste",
    "atenas",
    "copenhague",
    "estocolmo",
    "dublin",
    "edimburgo",
    "viena",
    "zurique",
    "moscou",
    "sao-petersburgo",
    "cairo",
    "marrakech",
    "jerusalem",
    "tel-aviv",
    "pequim",
    "xangai",
    "hong-kong",
    "seul",
    "singapura",
    "kuala-lumpur",
    "bali",
    "hanói",
    "siem-reap",
    "delhi",
    "mumbai",
    "agra",
    "maldivas",
    "havana",
    "cidade-do-mexico",
    "toronto",
    "vancouver",
    "los-angeles",
    "sao-francisco",
    "las-vegas",
    "chicago",
    "nova-orleans",
    "gramado",
    "canela",
    "florianopolis",
    "salvador",
    "recife",
    "porto-de-galinhas",
    "maceio",
    "fortaleza",
    "natal",
    "foz-do-iguacu",
    "manaus",
    "bonito",
    "ouro-preto",
    "porto-seguro",
    "arraial-do-cabo",
    "buzios",
    "ilhabela",
    "curitiba",
    "belo-horizonte",
    "brasilia"
  ];

  const allCities = [...hotTopicsCities, ...mostSearchedCities];
  const uniqueCities = [...new Set(allCities)];

  const dynamicRoutes: MetadataRoute.Sitemap = uniqueCities.flatMap((citySlug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${citySlug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          "pt-br": `${baseUrl}/pt-br`,
          en: `${baseUrl}/en`,
          "x-default": `${baseUrl}/pt-br`,
        }
      }
    },
    {
      url:`${baseUrl}/pt-br/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url:`${baseUrl}/en/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url:`${baseUrl}/pt-br/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url:`${baseUrl}/en/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...dynamicRoutes
  ]

}