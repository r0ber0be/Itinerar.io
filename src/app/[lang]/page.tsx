import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotTopics from "@/components/HotTopics";
import ItineraryGenerator from "@/components/ItineraryGenerator";
import { Locale } from "@/i18nConfig";

export default async function Home({ 
  params: { lang },
}: Readonly<{ params: { lang: Locale }}>) {

  const content = lang === 'en' ? {
    hero: {
      title: "Plan your perfect trip",
      subtitle: "Discover the best tourist attractions and create personalized travel itineraries for any destination in the world.",
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          title: "Search for a City",
          description: "Enter the name of the city you want to visit in the search bar above.",
        },
        {
          title: "Get Your Itinerary",
          description: "We'll instantly generate a personalized itinerary with the top tourist attractions and points of interest.",
        },
        {
          title: "Explore and Plan",
          description: "View detailed information about each location, including ratings, addresses, and photos.",
        },
      ],
    },
    destinations: {
      title: "Popular Destinations",
      description: "Explore travel guides for the most visited cities in the world. From European capitals to paradisiacal beaches, we have complete itineraries for you.",
    },
    benefits: {
      title: "Why Use Itinerar?",
      items: [
        "Personalized itineraries based on the best tourist attractions",
        "Updated information about places, including ratings and photos",
        "Optimized routes to make the most of your time",
        "100% free and easy to use",
      ],
    },
  } : {
    hero: {
      title: "Planeje sua viagem perfeita",
      subtitle: "Descubra os melhores pontos turísticos e crie roteiros de viagem personalizados para qualquer destino do mundo.",
    },
    howItWorks: {
      title: "Como Funciona",
      steps: [
        {
          title: "Busque uma Cidade",
          description: "Digite o nome da cidade que você deseja visitar no campo de busca acima.",
        },
        {
          title: "Receba seu Roteiro",
          description: "Geramos instantaneamente um roteiro personalizado com os principais pontos turísticos e locais de interesse.",
        },
        {
          title: "Explore e Planeje",
          description: "Veja informações detalhadas sobre cada local, incluindo avaliações, endereços e fotos.",
        },
      ],
    },
    destinations: {
      title: "Destinos Populares",
      description: "Explore guias de viagem para as cidades mais visitadas do mundo. De capitais europeias a praias paradisíacas, temos roteiros completos para você.",
    },
    benefits: {
      title: "Por que usar o Itinerar?",
      items: [
        "Roteiros personalizados baseados nos melhores pontos turísticos",
        "Informações atualizadas sobre os locais, incluindo avaliações e fotos",
        "Rotas otimizadas para aproveitar melhor seu tempo",
        "100% gratuito e fácil de usar",
      ],
    },
  };

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      { /* CONTEÚDO PRINCIPAL */ }
      <Header />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        <main className="col-span-12 lg:col-span-10 mt-2.5">
          <ItineraryGenerator lang={lang} />
          {/* SEÇÃO HERO COM CONTEÚDO */}
          <section className="my-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {content.hero.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {content.hero.subtitle}
            </p>
          </section>

          {/* COMO FUNCIONA */}
          <section className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.howItWorks.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.howItWorks.steps.map((step, index) => (
                <div key={index} className="card p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-500 mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <HotTopics />

          {/* BENEFÍCIOS */}
          <section className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.benefits.title}
            </h2>
            <ul className="space-y-4">
              {content.benefits.items.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg 
                    className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SEO CONTENT */}
          <section className="my-12 prose prose-lg dark:prose-invert max-w-none">
            {lang === 'en' ? (
              <>
                <h2>Discover the World with Itinerar</h2>
                <p>
                  Itinerar is your travel companion for exploring cities around the world. 
                  We create personalized itineraries featuring the most iconic tourist attractions, 
                  hidden gems, and must-visit places in any destination.
                </p>
                <p>
                  Whether you're planning a trip to Paris, exploring the streets of Rome, 
                  or relaxing on the beaches of Jericoacoara, our platform helps you 
                  make the most of your travel experience with optimized routes and 
                  up-to-date information.
                </p>
              </>
            ) : (
              <>
                <h2>Descubra o Mundo com o Itinerar</h2>
                <p>
                  O Itinerar é seu companheiro de viagem para explorar cidades ao redor do mundo. 
                  Criamos roteiros personalizados com as atrações turísticas mais icônicas, 
                  joias escondidas e lugares imperdíveis em qualquer destino.
                </p>
                <p>
                  Seja planejando uma viagem para Paris, explorando as ruas de Roma, 
                  ou relaxando nas praias de Jericoacoara, nossa plataforma ajuda você 
                  a aproveitar ao máximo sua experiência de viagem com rotas otimizadas e 
                  informações atualizadas.
                </p>
              </>
            )}
          </section>
        </main>
        <Advertisement />
      </div>

      <Footer />
    </div>
  );
}
