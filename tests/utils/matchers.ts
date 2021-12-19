import { getDeltaSummary } from "@bobaboard/boba-editor";

export const TagMatcher = (tagText: string) => {
  return (_: string, node: HTMLElement) => {
    return (
      node.getAttribute("role") === "switch" && node.textContent === tagText
    );
  };
};

export const DeltaMatcher = (text: string) => {
  const summary = getDeltaSummary(JSON.parse(text)).text.trim();
  return (_: string, node: HTMLElement) => {
    return (
      node.getAttribute("role") === "comment" && node.textContent === summary
    );
  };
};
