import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import koCommon from "./locales/ko/common";
import enCommon from "./locales/en/common";
import jaCommon from "./locales/ja/common";

export const supportedLanguages = ["ko", "en", "ja"];

export function normalizeLanguage(language) {
  const normalized = String(language || "").toLowerCase().split("-")[0];
  return supportedLanguages.includes(normalized) ? normalized : "ko";
}

function getInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage) return normalizeLanguage(queryLanguage);

  try {
    return normalizeLanguage(window.localStorage.getItem("portfolio-language"));
  } catch {
    return "ko";
  }
}

i18n.use(initReactI18next).init({
  resources: {
    ko: { common: koCommon },
    en: { common: enCommon },
    ja: { common: jaCommon },
  },
  lng: getInitialLanguage(),
  fallbackLng: "ko",
  defaultNS: "common",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

function syncLanguage(language) {
  const normalized = normalizeLanguage(language);
  document.documentElement.lang = normalized;

  try {
    window.localStorage.setItem("portfolio-language", normalized);
  } catch {
    // The URL still preserves the choice when storage is unavailable.
  }

  const url = new URL(window.location.href);
  if (normalized === "ko") url.searchParams.delete("lang");
  else url.searchParams.set("lang", normalized);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

syncLanguage(i18n.resolvedLanguage);
i18n.on("languageChanged", syncLanguage);

export default i18n;
