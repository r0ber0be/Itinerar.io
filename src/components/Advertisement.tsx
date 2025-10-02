import Image from "next/image";

export default function Advertisement() {
  return (
    <aside className="hidden lg:block col-span-2 mt-2.5">
      <Image 
        className="rounded-2xl" 
        src={'/assets/adbanner.jpg'} 
        width={400} height={400} 
        alt="Anúncio da empresa VoandoAlto com 50% de desconto em passagens para a Europa." 
        priority
      />
      <Image 
        className="mt-2.5 rounded-2xl" 
        src={'/assets/adbanner.jpg'} 
        width={400} 
        height={400} 
        alt="Anúncio da empresa VoandoAlto com 50% de desconto em passagens para a Europa." 
        priority 
      />
    </aside>
  )
}