import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./assets/locales/en/translation.json";
import translationTH from "./assets/locales/th/translation.json";

// the translations
const resources = {
  th: {
    translation: translationTH,
  },
  en: {
    translation: translationEN,
  },
};

i18n.defaultLocale = 'th';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "th",
    debug: true,
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
