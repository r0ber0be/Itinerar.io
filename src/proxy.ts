import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/i18nConfig";
import { cityNameFromSlug, toCitySlug } from "@/helpers/citySlug";

const NON_CITY_PAGES = new Set(["about", "privacy"]);

// Feito aqui e não na página porque o loading.tsx da rota de cidade faz streaming,
// e aí o redirect sairia como meta refresh com status 200 em vez de 308.
function getCanonicalCityPath(pathname: string) {
  const [, lang, city, ...rest] = pathname.split("/");

  if (!city || rest.length > 0 || NON_CITY_PAGES.has(city)) return null;

  let decodedCity: string;
  try {
    decodedCity = decodeURIComponent(city);
  } catch {
    return null;
  }

  const citySlug = toCitySlug(cityNameFromSlug(city));
  if (decodedCity === citySlug) return null;

  return `/${lang}/${encodeURIComponent(citySlug)}`;
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  for (const [key, value] of request.headers) {
    negotiatorHeaders[key] = value;
  }

  const locales: string[] = [...i18n.locales];

  // Usa o Negotiator para obter os idiomas preferidos do navegador do usuário
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    console.error("Erro ao tentar fazer o match de locale no middleware:", error);
    return i18n.defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const canonicalCityPath = getCanonicalCityPath(pathname);
    if (!canonicalCityPath) return;

    const url = request.nextUrl.clone();
    url.pathname = canonicalCityPath;
    return NextResponse.redirect(url, 308);
  }

  const locale = getLocale(request);

  return NextResponse.rewrite(
    new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/|assets/|favicon.ico|sw.js|robots.txt|sitemap.xml|ads.txt|manifest.webmanifest).*)",
  ],
};
