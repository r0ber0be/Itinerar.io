"use client"

import { useTranslation } from "./providers/TranslationProvider";

export default function HowItWorks() {
  const { howItWorks } = useTranslation();
  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        {howItWorks.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {howItWorks.steps.map((step) => (
          <div key={step.id} className="card p-6 rounded-2xl">
            <div className="text-4xl font-bold text-blue-500 mb-4">
              {step.id + 1}
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}