"use client";

import { useTranslation } from "@/components/providers/TranslationProvider";

export default function Loading() {
  const dictionary = useTranslation();
  return (
    <section className="mt-6">
      <p role="status" aria-live="polite" className="text-muted mb-4">
        {dictionary.loadingItinerary}
      </p>
      {/* Esqueleto no formato dos cards do roteiro, para a troca não deslocar a página. */}
      <div aria-hidden="true" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 motion-safe:animate-pulse">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-2xl overflow-hidden bg-card">
            <div className="h-48 bg-foreground/10" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-2/3 rounded bg-foreground/10" />
              <div className="h-3 w-full rounded bg-foreground/10" />
              <div className="h-3 w-1/2 rounded bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
