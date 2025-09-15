'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const words = ["São Paulo", "Paris", "Recife", "Londres", "Buenos Aires", "Gramado", "Dubai", "Istambul", "Fortaleza"];
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 3000); // pausa antes de apagar
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    setCurrentWord(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
      { /* CONTEÚDO PRINCIPAL */ }
      <main className="col-span-12 lg:col-span-10 mt-2.5">
        <div className="grid col-span-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-4 absolute"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
            />
          </svg>

          <span className="font-semibold mx-5 text-xs uppercase">Itinerar.io</span>
        </div>

        <h1 className="text-3xl md:text-5xl mt-3 mb-2">
          O que fazer em {` `}
          <span className="text-blue-400 border-r-2 border-blue-400 pr-1">{currentWord}</span>
        </h1>

        { /* BARRA DE PESQUISA */ }
        <div className="w-full grid place-items-center mt-5 mb-3">
          <div className="relative w-full md:w-2/3 lg:w-2/3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={1.5}
              stroke="currentColor" 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
              />
            </svg>

            <input
              type="text" 
              placeholder="Pesquisar cidade" 
              className="w-full px-10 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        { /* BOTÃO DE BUSCA */ }
        <div className="grid place-items-center w-full">
          <button className="rounded-2xl px-6 py-3 w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer">
            Buscar
          </button>
        </div>

        { /* HOT TOPIcs */ }
        <h1 className="text-2xl md:text-3xl mt-3.5 mb-3.5">Roteiros em destaque</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card rounded-2xl cursor-pointer overflow-hidden">
            <div className="relative w-full h-48">
              <Image 
                src={'/paris.png'} 
                className="object-cover" 
                fill 
                sizes="(max-width: 768px) 100vw, 
                  (max-width: 1024px) 50vw, 
                  33vw"
                priority
                alt="cidade"
              />
            </div>
            <div className="px-6 py-3 text-xl md:text-2xl">Paris</div>
          </div>

          <div className="card rounded-2xl cursor-pointer overflow-hidden">
            <div className="relative w-full h-48">
              <Image 
                src={'/roma.jpg'} 
                className="object-cover" 
                fill
                sizes="(max-width: 768px) 100vw, 
                  (max-width: 1024px) 50vw, 
                  33vw"
                priority
                alt="cidade"
              />
            </div>
            <div className="px-6 py-3 text-2xl">Roma</div>
          </div>

          <div className="card rounded-2xl cursor-pointer overflow-hidden">
            <div className="relative w-full h-48">
              <Image 
                src={'/jericoacoara.png'} 
                className="object-cover" 
                fill
                sizes="(max-width: 768px) 100vw, 
                  (max-width: 1024px) 50vw, 
                  33vw"
                priority
                alt="cidade"
              />
            </div>
            <div className="px-6 py-3 text-2xl">Jericoacoara</div>
          </div>
        </div>
      </main>
      
      { /* Coluna lateral direita (ADS)*/ }
      <aside className="col-span-2 border-2 mt-auto">
        <Image className="rounded-2xl" src={'/adbanner.jpg'} width={400} height={400} alt="anúncio" priority  />
        <Image className="mt-2.5 rounded-2xl" src={'/adbanner.jpg'} width={400} height={400} alt="anúncio" priority />
      </aside>

      <footer className="grid col-span-12">Itinerar.io - Feito por Robson Lopes Cavalcante</footer>
    </div>
  );
}
