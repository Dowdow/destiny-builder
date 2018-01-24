export const LOCALES_SUPPORTED = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pl', 'ru'];

export default function computeLocale() {
  const locale = navigator.language.split('-')[0] || 'en';
  if (LOCALES_SUPPORTED.includes(locale)) {
    return locale;
  }
  return 'en';
}
