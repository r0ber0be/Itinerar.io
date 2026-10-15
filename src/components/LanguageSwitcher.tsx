"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { i18n } from "@/i18nConfig"

export default function LanguageSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const currentLang = pathName?.split("/")[1]

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {i18n.locales.map((locale, index) => {
        const localeLabel = locale === "pt-br" ? "BR" : "EN";
        const localeName = locale === "pt-br" ? "Português" : "English";
        const isCurrent = currentLang === locale;

        return (
          <React.Fragment key={locale}>
            <Link
              href={redirectedPathName(locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={isCurrent ? "page" : undefined}
              className={
                (isCurrent
                  ? "text-blue-700 font-bold dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors")
                + " inline-flex items-center justify-center min-h-11 min-w-11 px-2"
              }
            >
              {localeLabel}
              <span className="sr-only"> ({localeName})</span>
            </Link>

            {index < i18n.locales.length - 1 && (
              <div aria-hidden="true" className="h-4 w-px bg-gray-300"></div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}