import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Locale } from "@/i18nConfig";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Itinerar",
  description: "Conheça o Itinerar - sua plataforma de roteiros de viagem personalizados",
};

export default function AboutPage({
  params: { lang },
}: Readonly<{ params: { lang: Locale }}>) {
  
  const content = lang === 'en' ? {
    title: "About Itinerar",
    lastUpdated: "Last updated: October 2025",
    sections: [
      {
        id: 1,
        title: "Our Mission",
        content: "Itinerar was created with a simple mission: to make travel planning easier, more efficient, and more enjoyable for everyone. We believe that discovering new places should be an exciting experience from the very first moment of planning.",
      },
      {
        id: 2,
        title: "What We Do",
        content: "We are a free platform that helps travelers discover and plan visits to cities around the world. Using advanced technology and reliable data sources, we generate personalized itineraries that include the top tourist attractions, points of interest, and hidden gems in each destination.",
      },
      {
        id: 3,
        title: "How It Works",
        content: "Our platform uses the Google Places API and Google Maps to provide accurate and up-to-date information about tourist destinations. When you search for a city, we automatically create an optimized itinerary considering the most popular and best-rated tourist attractions, optimized routes to save time, detailed information including addresses, ratings, and photos, and integration with Google Maps for easy navigation.",
      },
      {
        id: 4,
        title: "Why Choose Itinerar?",
        content: "We offer our complete service 100% free, with no subscriptions or hidden fees. We use reliable data sources to ensure the information is always current and accurate. Our intuitive interface makes travel planning simple and quick, and we create efficient routes so you can make the most of your time.",
      },
      {
        id: 5,
        title: "Our Commitment",
        content: "We are committed to continuously improving our platform and expanding our coverage to include more cities and destinations worldwide. Your feedback is essential to help us grow and serve you better.",
      }
    ],
  } : {
    title: "Sobre o Itinerar",
    lastUpdated: "Última atualização: Outubro de 2025",
    sections: [
      {
        id: 1,
        title: "Nossa Missão",
        content: "O Itinerar foi criado com uma missão simples: tornar o planejamento de viagens mais fácil, eficiente e agradável para todos. Acreditamos que descobrir novos lugares deve ser uma experiência emocionante desde o primeiro momento do planejamento.",
      },
      {
        id: 2,
        title: "O Que Fazemos",
        content: "Somos uma plataforma gratuita que ajuda viajantes a descobrir e planejar visitas a cidades ao redor do mundo. Utilizando tecnologia avançada e fontes de dados confiáveis, geramos roteiros personalizados que incluem as principais atrações turísticas, pontos de interesse e joias escondidas de cada destino.",
      },
      {
        id: 3,
        title: "Como Funciona",
        content: "Nossa plataforma utiliza a API do Google Places e Google Maps para fornecer informações precisas e atualizadas sobre destinos turísticos. Quando você busca por uma cidade, criamos automaticamente um roteiro otimizado considerando as atrações turísticas mais populares e bem avaliadas, rotas otimizadas para economizar tempo, informações detalhadas incluindo endereços, avaliações e fotos, e integração com Google Maps para facilitar a navegação.",
      },
      {
        id: 4,
        title: "Por Que Escolher o Itinerar?",
        content: "Oferecemos nosso serviço completo 100% gratuito, sem assinaturas ou taxas ocultas. Utilizamos fontes de dados confiáveis para garantir que as informações estejam sempre atuais e precisas. Nossa interface intuitiva torna o planejamento de viagens simples e rápido, e criamos rotas eficientes para que você aproveite ao máximo seu tempo.",
      },
      {
        id: 5,
        title: "Nosso Compromisso",
        content: "Estamos comprometidos em melhorar continuamente nossa plataforma e expandir nossa cobertura para incluir mais cidades e destinos ao redor do mundo. Seu feedback é essencial para nos ajudar a crescer e servi-lo melhor.",
      },
    ],
  };

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      <Header />
      
      <main className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {content.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {content.lastUpdated}
        </p>

        <div className="space-y-8">
          {content.sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-2xl font-semibold mb-3">
                {section.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}