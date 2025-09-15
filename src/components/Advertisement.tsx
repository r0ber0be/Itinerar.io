import Image from "next/image";

export default function Advertisement() {
  return (
    <aside className="col-span-2 border-2 mt-auto">
      <Image className="rounded-2xl" src={'/adbanner.jpg'} width={400} height={400} alt="anúncio" priority  />
      <Image className="mt-2.5 rounded-2xl" src={'/adbanner.jpg'} width={400} height={400} alt="anúncio" priority />
    </aside>
  )
}