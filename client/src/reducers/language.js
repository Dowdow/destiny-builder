import { SET_LANGUAGE } from '../actions/language';

export const LANGS_SUPPORTED = ['de', 'en', 'es', 'fr', 'it', 'ja', 'pl', 'ru'];

function computeLanguage() {
  const lang = navigator.language.split('-')[0] || 'en';
  if (LANGS_SUPPORTED.includes(lang)) {
    return lang;
  }
  return 'en';
}

export default function language(state = computeLanguage(), action = {}) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.language;
    default: return state;
  }
}
