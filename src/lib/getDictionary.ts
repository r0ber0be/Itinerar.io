import 'server-only'
import { Locale, i18n } from '@/i18nConfig'

const dictionaries: Record<Locale, () => Promise<any>> = {
  'en': () => import('@/dictionaries/en.json').then((module) => module.default),
  'pt-br': () => import('@/dictionaries/pt-br.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};