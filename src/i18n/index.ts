// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./en.json";
import ta from "./ta.json";

const resources = {
  en: { translation: en },
  ta: { translation: ta }
};

// Get device language safely
let deviceLanguage = "en";
try {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    deviceLanguage = locales[0].languageCode;
  }
} catch (e) {
  deviceLanguage = "en";
}

// Choose language: Tamil if device lang is "ta", else English
const languageTag = deviceLanguage === "ta" ? "ta" : "en";

i18n
  .use(initReactI18next)
  .init({
    lng: languageTag,
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
