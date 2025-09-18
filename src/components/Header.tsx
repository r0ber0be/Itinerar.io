import Logo from "./Logo";
import MainTitle from "./MainTitle";

export default function Header() {
  return (
    <header className="w-full mt-2.5">
      <Logo />
       { /* NOME DINÂMICO */ }
      <MainTitle />
    </header>
  )
}