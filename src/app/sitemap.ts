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
    "buenos-aires"
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
      priority: 1.0,
      alternates: {
        languages: {
          "pt-br": `${baseUrl}/pt-br`,
          en: `${baseUrl}/en`,
          "x-default": `${baseUrl}/pt-br`,
        }
      }
    },
    ...dynamicRoutes
  ]

}