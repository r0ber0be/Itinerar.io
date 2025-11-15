"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React from "react"
import { i18n } from "@/i18nConfig"

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    
    const segments = pathName.split("/")
    segments[1] = locale
    const newPath = segments.join("/")
    const paramsString = searchParams.toString()

    return paramsString ? `${newPath}?${paramsString}` : newPath
  }

  const currentLang = pathName.split("/")[1]

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {i18n.locales.map((locale, index) => {
        const localeLabel = locale === "pt-br" ? "BR" : "EN";
        
        return (
          <React.Fragment key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className={
                currentLang === locale
                  ? "text-blue-600 font-bold dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              }
            >
              {localeLabel}
            </Link>

            {index < i18n.locales.length - 1 && (
              <div className="h-4 w-px bg-gray-300"></div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}