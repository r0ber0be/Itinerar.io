import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/i18nConfig";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  for (const [key, value] of request.headers) {
    negotiatorHeaders[key] = value;
  }

  const locales: string[] = [...i18n.locales];

  // Usa o Negotiator para obter os idiomas preferidos do navegador do usuário
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    console.error("Erro ao tentar fazer o match de locale no middleware:", error);
    return i18n.defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

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
