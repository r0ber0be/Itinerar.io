"use client";

import { useTranslation } from "./providers/TranslationProvider";

export default function Benefits() {
  const { benefits } = useTranslation();
  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        {benefits.title}
      </h2>
      <ul className="space-y-4">
        {benefits.items.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg 
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="text-lg">{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}