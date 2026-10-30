import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";

export default function SearchSection({ pending }: Readonly<{ pending?: boolean }>) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <SearchBar />
      <SearchButton pending={pending} />
    </div>
  )
}
