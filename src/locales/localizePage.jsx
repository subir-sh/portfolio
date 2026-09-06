import { Children, cloneElement, isValidElement } from "react";

const normalizeLanguage = (language) => {
  const code = String(language || "ko").toLowerCase();
  if (code.startsWith("ja")) return "ja";
  if (code.startsWith("en")) return "en";
  return "ko";
};

const translateValue = (value, dictionary) => {
  if (typeof value === "string") return dictionary[value] ?? value;
  if (Array.isArray(value)) return value.map((item) => translateValue(item, dictionary));
  if (value && value.constructor === Object) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateValue(item, dictionary)]),
    );
  }
  return value;
};

const translateNode = (node, dictionary) => {
  if (typeof node === "string") return dictionary[node] ?? node;
  if (!isValidElement(node)) return node;

  const props = Object.fromEntries(
    Object.entries(node.props)
      .filter(([key]) => key !== "children")
      .map(([key, value]) => [key, translateValue(value, dictionary)]),
  );
  const children = Children.map(node.props.children, (child) => translateNode(child, dictionary));

  return cloneElement(node, props, children);
};

export default function localizePage(node, language, dictionaries) {
  const dictionary = dictionaries[normalizeLanguage(language)];
  return dictionary ? translateNode(node, dictionary) : node;
}
