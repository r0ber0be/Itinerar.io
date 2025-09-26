import SearchSection from "./SearchSection";

export default function ItineraryGenerator() {
  return (
    <section className="w-full">
      <form method="GET">
        <SearchSection />
      </form>
    </section>
  );
}