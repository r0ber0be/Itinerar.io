export const i18n = {
  defaultLocale: 'pt-br',
  locales: ['pt-br', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]