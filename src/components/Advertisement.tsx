import Image from "next/image";

export default function Advertisement() {
  return (
    <aside className="hidden lg:block col-span-2 mt-2.5">
      { /* START ADVERTISER: Booking.com LATAM from awin.com */ }
      <a rel="sponsored noopener noreferrer" href="https://www.awin1.com/cread.php?s=3998073&v=18119&q=370884&r=2602038">
        <Image 
          className="mt-2.5 rounded-2xl" 
          src={"https://www.awin1.com/cshow.php?s=3998073&v=18119&q=370884&r=2602038"}
          style={{ border: 0 }}
          width={400}
          quality={80}
          height={400} 
          alt="Booking.com - Suas férias sonhadas estão a poucas horas de voo" 
          priority 
        />
      </a>
      { /* END ADVERTISER: Booking.com LATAM from awin.com */ }
    </aside>
  )
}