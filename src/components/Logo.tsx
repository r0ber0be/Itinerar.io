import WorldSVG from "./svg/world";

export default function Logo() {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2 w-fit">
      <WorldSVG />
      <span className="font-bold text-base tracking-wide uppercase">Itinerar</span>
    </div>
  )
}