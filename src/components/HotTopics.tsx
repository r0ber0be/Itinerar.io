"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "./providers/TranslationProvider";
import { usePathname } from "next/navigation";


const topics = [
  {
    city: "Paris",
    imageUrl: "/paris.png",
    alt: "A Torre Eiffel em Paris, vista do rio Sena, com uma ponte e árvores com folhagem de outono.",
  },
  {
    city: "Roma",
    imageUrl: "/roma.jpg",
    alt: "O Coliseu em Roma ao nascer do sol, com os raios de luz brilhando intensamente ao lado da antiga estrutura.",
  },
  {
    city: "Jericoacoara",
    imageUrl: "/jericoacoara.png",
    alt: "A Pedra Furada em Jericoacoara, uma grande formação rochosa com um arco no centro, localizada na praia com o mar ao fundo.",
  }
]
export default function HotTopics() {
  const dictionary = useTranslation();
  const pathName = usePathname(); 
  const lang = pathName.split('/')[1];
  
  return (
    <>
      <h2 className="text-2xl md:text-3xl mt-3.5 mb-3.5">
        { dictionary.featuredRoutes }
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        { topics.map((topic) => (
          <Link
            key={topic.city}
            href={`/${lang}/${encodeURIComponent(topic.city)}`}
             className="card rounded-2xl cursor-pointer overflow-hidden block transition-transform hover:scale-105"
          >
            <div className="card rounded-2xl cursor-pointer overflow-hidden">
              <div className="relative w-full h-48">
                <Image 
                  src={topic.imageUrl} 
                  className="object-cover" 
                  fill 
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority
                  fetchPriority="high"
                  alt={topic.alt}
                />
              </div>
              <div className="px-6 py-3 text-xl md:text-2xl">{topic.city}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}