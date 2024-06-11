import { initReactI18next } from 'react-i18next';

import i18next, { Resource } from 'i18next';

import Languages, { Language } from 'src/constants/localization/languages';

const languageResources: Resource = Languages.reduce(
  (acc: Resource, language: Language) => {
    return {
      ...acc,
      [language.code]: {
        translation: language.file,
      },
    };
  },
  {}
);

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: languageResources,
  lng: 'tr',
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
