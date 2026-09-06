import ko from "./ko/home";
import en from "./en/home";
import ja from "./ja/home";
import { normalizeLanguage } from "../i18n";

const content = { ko, en, ja };

export default function getHomeContent(language) {
  return content[normalizeLanguage(language)];
}
