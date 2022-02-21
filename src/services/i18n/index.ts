import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, languages, pt } from '~/../translations';
import environment from '~/config/environment';
import { languageDetectorPlugin } from '~/utils/LanguageDetectorPlugin';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: languages.en,
    debug: environment.environment === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
