export const TagMatcher = (tagText: string) => {
  return (_: string, node: HTMLElement) => {
    return (
      node.tagName.toLowerCase() === "button" && node.textContent === tagText
    );
  };
};
