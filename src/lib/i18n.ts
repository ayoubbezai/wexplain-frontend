// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../public/locales/en/common.json";
import frCommon from "../../public/locales/fr/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    fr: { common: frCommon },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
