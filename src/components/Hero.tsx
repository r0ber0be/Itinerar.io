"use client"

import { useTranslation } from "./providers/TranslationProvider";

export default function Hero() {
  const { hero } = useTranslation();
  return (
    <section className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        {hero.title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {hero.subtitle}
      </p>
    </section>
  )
}