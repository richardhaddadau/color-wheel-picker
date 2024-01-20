const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  if (hex.startsWith("#")) hex = hex.slice(1);
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((char) => char + char)
      .join(",");

  const [rgbR, rgbG, rgbB] = [0, 2, 4]
    .map((i) => hex.slice(i, i + 2))
    .map((hexChar) => parseInt(hexChar, 16));

  return { r: rgbR, g: rgbG, b: rgbB };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  let hex: string[] = [];

  let rgbR0 = Math.floor(r / 16)
      .toString(16)
      .toUpperCase(),
    rgbR1 = (r % 16).toString(16).toUpperCase(),
    rgbG0 = Math.floor(g / 16)
      .toString(16)
      .toUpperCase(),
    rgbG1 = (g % 16).toString(16).toUpperCase(),
    rgbB0 = Math.floor(b / 16)
      .toString(16)
      .toUpperCase(),
    rgbB1 = (b % 16).toString(16).toUpperCase();

  hex.push(rgbR0, rgbR1, rgbG0, rgbG1, rgbB0, rgbB1);

  return `#${hex.join("")}`;
};

export { hexToRgb, rgbToHex };
