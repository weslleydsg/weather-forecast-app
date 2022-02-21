import { findBestAvailableLanguage } from 'react-native-localize';
import { DeviceStorage } from '~/utils/DeviceStorage';
import { languages } from '~/../translations';
import { LanguageDetectorAsyncModule } from 'i18next';

const STORE_KEY = 'settings.lang';

export const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  async detect(callback: (lang: string) => void) {
    try {
      const storedLanguage = await DeviceStorage.getData<string>(
        'settings.lang',
      );
      if (storedLanguage) return callback(storedLanguage);
      const language = findBestAvailableLanguage(Object.keys(languages));
      if (language) return callback(language.languageTag);
      return callback(languages.en);
    } catch (error) {
      return callback(languages.en);
    }
  },
  async cacheUserLanguage(language: string) {
    await DeviceStorage.storeData(STORE_KEY, language);
  },
};
