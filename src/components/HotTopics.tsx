"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "./providers/TranslationProvider";
import { useParams } from "next/navigation";


const topics = [
  {
    city: "Paris",
    imageUrl: "/assets/paris.png",
    alt: "A Torre Eiffel em Paris, vista do rio Sena, com uma ponte e árvores com folhagem de outono.",
  },
  {
    city: "Roma",
    imageUrl: "/assets/roma.jpg",
    alt: "O Coliseu em Roma ao nascer do sol, com os raios de luz brilhando intensamente ao lado da antiga estrutura.",
  },
  {
    city: "Jericoacoara",
    imageUrl: "/assets/jericoacoara.png",
    alt: "A Pedra Furada em Jericoacoara, uma grande formação rochosa com um arco no centro, localizada na praia com o mar ao fundo.",
  }
];

type HotTopicsProps = {
  lang?: string;
};

export default function HotTopics({ lang: langProp }: Readonly<HotTopicsProps>) {
  const dictionary = useTranslation();
  const params = useParams<{ lang?: string | string[] }>();

  const langFromParams = Array.isArray(params?.lang)
    ? params.lang[0]
    : params?.lang;

  const lang = langProp ?? langFromParams ?? "pt-br";
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-5">
        { dictionary.featuredRoutes }
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        { topics.map((topic) => (
          <Link
            key={topic.city}
            href={`/${lang}/${encodeURIComponent(topic.city.toLowerCase())}`}
            className="group rounded-2xl overflow-hidden block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            prefetch={true}
          >
            <div className="card h-full">
              <div className="relative w-full h-48 overflow-hidden">
                <Image 
                  src={topic.imageUrl}
                  className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105" 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority
                  quality={75}
                  alt={topic.alt}
                />
              </div>
              <div className="px-5 py-4 text-xl md:text-2xl font-semibold">{topic.city}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}