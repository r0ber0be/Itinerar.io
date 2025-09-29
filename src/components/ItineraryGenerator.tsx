"use client";

import { useRouter } from "next/navigation";
import SearchSection from "./SearchSection";

export default function ItineraryGenerator({ lang }: { lang: string }) {
  const router = useRouter();

  function handleSearch(formData: FormData) {
    const city = formData.get("q")?.toString().trim();
    console.log("----------- cidade-------", city, lang)
    if (city) {
      router.push(`/${lang}/${encodeURIComponent(city.toLowerCase())}`);
    }
  }

  return (
    <section className="w-full">
      <form action={handleSearch}>
        <SearchSection />
      </form>
    </section>
  );
}