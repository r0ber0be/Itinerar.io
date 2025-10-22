import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Locale } from "@/i18nConfig";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do Itinerar - Como coletamos e protegemos seus dados",
};

export default function PrivacyPolicy({
  params: { lang },
}: Readonly<{ params: { lang: Locale }}>) {
  
  const content = lang === 'en' ? {
    title: "Privacy Policy",
    lastUpdated: "Last updated: October 2025",
    sections: [
      {
        id: 1,
        title: "Information We Collect",
        content: "We collect information that you provide directly to us when using our service, including search queries for cities and travel destinations.",
      },
      {
        id: 2,
        title: "How We Use Your Information",
        content: "We use the information we collect to provide, maintain, and improve our services, including generating personalized travel itineraries.",
      },
      {
        id: 3,
        title: "Cookies and Tracking",
        content: "We use cookies and similar tracking technologies to collect information about your browsing activities and to provide personalized content.",
      },
      {
        id: 4,
        title: "Third-Party Services",
        content: "We use Google Maps API and Google Places API to provide location information and travel itineraries. We also use Google AdSense to display advertisements.",
      },
      {
        id: 5,
        title: "Data Security",
        content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.",
      },
      {
        id: 6,
        title: "Your Rights",
        content: "You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise these rights.",
      },
    ],
  } : {
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: Outubro de 2025",
    sections: [
      {
        id: 1,
        title: "Informações que Coletamos",
        content: "Coletamos informações que você nos fornece diretamente ao usar nosso serviço, incluindo consultas de busca por cidades e destinos de viagem.",
      },
      {
        id: 2,
        title: "Como Usamos Suas Informações",
        content: "Usamos as informações que coletamos para fornecer, manter e melhorar nossos serviços, incluindo a geração de roteiros de viagem personalizados.",
      },
      {
        id: 3,
        title: "Cookies e Rastreamento",
        content: "Usamos cookies e tecnologias de rastreamento semelhantes para coletar informações sobre suas atividades de navegação e fornecer conteúdo personalizado.",
      },
      {
        id: 4,
        title: "Serviços de Terceiros",
        content: "Utilizamos a API do Google Maps e Google Places para fornecer informações de localização e roteiros de viagem. Também usamos o Google AdSense para exibir anúncios.",
      },
      {
        id: 5,
        title: "Segurança de Dados",
        content: "Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração ou destruição.",
      },
      {
        id: 6,
        title: "Seus Direitos",
        content: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco se desejar exercer esses direitos.",
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