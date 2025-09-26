// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../public/locales/en/common.json";
import frCommon from "../../public/locales/fr/common.json";
import enAuth from "../../public/locales/en/auth.json";
import frAuth from "../../public/locales/fr/auth.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, auth: enAuth },
    fr: { common: frCommon, auth: frAuth },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export default i18n;
