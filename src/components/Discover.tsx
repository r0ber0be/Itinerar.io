"use client";

import { useTranslation } from "./providers/TranslationProvider";

export default function Discover() {
  const { discover } = useTranslation();
  return (
    <section className="my-12 prose prose-lg dark:prose-invert max-w-none">
      <h2>{discover.title}</h2>
      <p>{discover.firstParagraph}</p>
      <p>{discover.secondParagraph}</p>
    </section>
  )
}