import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import MainTitle from "./MainTitle";

export default function Header() {
  return (
    <header className="grid w-full mt-2.5">
      <div className="grid grid-cols-2 items-start">
        <Logo />
        <nav className="justify-self-end">
          <LanguageSwitcher />
        </nav>
      </div>
      <MainTitle />
    </header>
  )
}