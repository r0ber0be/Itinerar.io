import 'server-only'
import { Locale } from '../../i18nConfig'

const dictionaries = {
  'en': () => import('@/dictionaries/en.json').then((module) => module.default),
  'pt-br': () => import('@/dictionaries/pt-br.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries['pt-br']();
};