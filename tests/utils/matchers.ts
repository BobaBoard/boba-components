export const TagMatcher = (tagText: string) => {
  return (_: string, node: HTMLElement) => {
    return (
      node.getAttribute("role") === "switch" && node.textContent === tagText
    );
  };
};
