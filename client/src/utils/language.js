const LANGS_SUPPORTED = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pl', 'ru'];

function getUserLanguage() {
  const lang = navigator.language.split('-')[0];
  if (LANGS_SUPPORTED.includes(lang)) {
    return lang;
  }
  return 'en';
}

export { getUserLanguage };
