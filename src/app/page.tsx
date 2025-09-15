import Advertisement from "@/components/Advertisement";
import Footer from "@/components/Footer";
import HotTopics from "@/components/HotTopics";
import Logo from "@/components/Logo";
import MainTitle from "@/components/MainTitle";
import SearchBar from "@/components/SearchBar";
import SearchButton from "@/components/SearchButton";

export default function Home() {
  return (
    <div className="font-sans w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
      { /* CONTEÚDO PRINCIPAL */ }
      <main className="col-span-12 lg:col-span-10 mt-2.5">
        <Logo />

        { /* NOME DINÂMICO */ }
        <MainTitle />

        { /* BARRA DE PESQUISA */ }
        <SearchBar />

        { /* BOTÃO DE BUSCA */ }
        <SearchButton />

        { /* HOT TOPIcs */ }
        <HotTopics />
      </main>
      
      { /* Coluna lateral direita (ADS)*/ }
      <Advertisement />

      <Footer />
    </div>
  );
}
