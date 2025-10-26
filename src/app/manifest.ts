import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Itinerar.com.br",
    short_name: "Itinerar",
    description: "Descubra os melhores pontos turísticos e o que fazer em qualquer destino, como São Paulo, Paris, Londres e muito mais. Crie roteiros de viagem personalizados com as melhores dicas e atrações.",
    display: "standalone",
    display_override: ["standalone"],
    start_url: "/",
    lang: "pt-BR",
    id: "/",
    scope: "/",
    theme_color: "#545454",
    background_color: "#000000",
    icons: [
       {
        src: "/assets/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/assets/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    categories: ["travel", "navigation", "productivity"],
    shortcuts: [
      {
        name: "Explorar destinos",
        short_name: "Destinos",
        description: "Acesse rapidamente a lista de cidades disponíveis.",
        url: "/pt-br",
        icons: [
          {
            src: "/assets/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/assets/og-image.png",
        sizes: "1536x1024",
        type: "image/png",
        label: "Pesquisa de destinos no Itinerar",
        form_factor: "wide",
      },
      {
        src: "/assets/roma.jpg",
        sizes: "820x430",
        type: "image/jpeg",
        label: "Visualização de sugestões de roteiro",
        form_factor: "narrow",
      },
    ],
  }
}