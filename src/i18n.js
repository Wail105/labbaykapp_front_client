import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    fallbackLng: "ar", // Fallback language if detected language is not available
    supportedLngs: ["ar", "en", "fr"], // Languages supported in the application
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to the translation files
    },
    detection: {
      order: ["path", "cookie", "htmlTag"], // Priority for language detection (e.g., URL, cookie, etc.)
      caches: ["cookie"], // Cache language in cookies
    },
    dir: (lng) => {
      if (lng === 'ar') {
        return 'rtl';
      } else {
        return 'ltr';
      }
    },
  });
export default i18n;