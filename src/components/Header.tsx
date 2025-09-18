import Logo from "./Logo";
import MainTitle from "./MainTitle";

export default function Header() {
  return (
    <header className="col-span-12 lg:col-span-10 mt-2.5">
      <Logo />
       { /* NOME DINÂMICO */ }
      <MainTitle />
    </header>
  )
}