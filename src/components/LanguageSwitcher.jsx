import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n";

const languages = [
  ["ko", "KO"],
  ["en", "EN"],
  ["ja", "JA"],
];

export default function LanguageSwitcher({ className = "" }) {
  const { t, i18n } = useTranslation("common");
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);

  return (
    <nav className={`language-switcher ${className}`.trim()} aria-label={t("language.label")}>
      {languages.map(([code, label]) => (
        <button
          type="button"
          key={code}
          className={currentLanguage === code ? "is-active" : ""}
          aria-label={t(`language.${code}`)}
          aria-pressed={currentLanguage === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
