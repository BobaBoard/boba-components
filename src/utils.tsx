export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] =
    hex.match(/\w\w/g)?.map((x: string) => parseInt(x, 16)) || [];
  if (r == undefined) {
    return hex;
  }
  return `rgba(${r},${g},${b},${alpha})`;
};
