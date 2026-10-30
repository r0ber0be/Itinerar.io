"use client";

import { useTranslation } from "./providers/TranslationProvider";

export default function Discover() {
  const { discover } = useTranslation();
  return (
    <section className="mt-16 mb-4 max-w-[68ch]">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{discover.title}</h2>
      <div className="space-y-4 text-lg leading-relaxed text-muted text-pretty">
        <p>{discover.firstParagraph.trim()}</p>
        <p>{discover.secondParagraph}</p>
      </div>
    </section>
  )
}