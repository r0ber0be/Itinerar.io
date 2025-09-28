import WorldSVG from "./svg/world";

export default function Logo() {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2 w-fit">
      <WorldSVG />
      <span className="font-semibold text-xs uppercase">Itinerar.io</span>
    </div>
  )
}