import Image from "next/image";

export default function HotTopics() {
  return (
    <>
      <h2 className="text-2xl md:text-3xl mt-3.5 mb-3.5">Roteiros em destaque</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
              alt="Ruelas charmosas de Paris, França, com arquitetura antiga ao pôr do sol."
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
              alt="Ruelas charmosas de Roma, Itália, com arquitetura antiga ao pôr do sol."
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
              alt="Ruelas charmosas de Jericoacoara, com visão encantadora do mar."
            />
          </div>
          <div className="px-6 py-3 text-2xl">Jericoacoara</div>
        </div>
      </div>
    </>
  )
}