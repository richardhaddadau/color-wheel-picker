// PRIVATE
const toHex = (value: number): string => {
  return value.toString(16).padStart(2, "0").toUpperCase();
};

const hueToRgb = (C: number, H: number): number => {
  let adjustedH = H;

  // adjust H to be between 0 and 360
  if (H < 0) adjustedH += 360;
  if (H > 360) adjustedH -= 360;

  const moddedH = (adjustedH / 60) % 2;
  let X = 0;

  // calculate X based on the value of (H/60)mod2
  if (moddedH < 1) X = C * moddedH;
  if (moddedH >= 1) X = C * (2 - moddedH);

  // use a single "lookup" table
  if (adjustedH < 60) return X;
  if (adjustedH < 180) return C;
  if (adjustedH < 240) return X;
  return 0;
};

// FORWARD - HEX to HSL
// FORWARD - Step 1. Convert Hex to RGB
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

// Step 2. Convert RGB to HSL
const rgbToHsl = (rgb: {
  r: number;
  g: number;
  b: number;
}): { h: number; s: number; l: number } => {
  const rDash = rgb.r / 255;
  const gDash = rgb.g / 255;
  const bDash = rgb.b / 255;

  // work out variables required to calculate HSL
  const cMax = Math.max(rDash, gDash, bDash);
  const cMin = Math.min(rDash, gDash, bDash);
  const diff = cMax - cMin;

  // calculate L
  const resultL = (cMax + cMin) / 2;

  // initialise H and S
  let resultH = 0;
  let resultS = 0;

  // calculate H and S based on value of diff
  if (diff === 0) {
    resultH = 0;
    resultS = 0;
  } else {
    switch (cMax) {
      case rDash:
        resultH = 60 * (((gDash - bDash) / diff) % 6);
        break;

      case gDash:
        resultH = 60 * ((bDash - rDash) / diff + 2);
        break;

      case bDash:
        resultH = 60 * ((rDash - gDash) / diff + 4);
        break;
    }

    resultS = diff / (1 - Math.abs(2 * resultL - 1));
  }

  // return HSL values
  // H in degrees between 0 and 360
  // S is a value between 0 and 100
  // L is a value between 0 and 100
  return {
    h: Math.round(resultH),
    s: Math.round(resultS * 100),
    l: Math.round(resultL * 100),
  };
};

// BACKWARD - HSL to HEX
// BACKWARD - Step 1. Convert HSL to RGB
const hslToRgb = (hsl: { h: number; s: number; l: number }) => {
  // assume hsl.h is between 0 and 360
  // assume hsl.s is between 0 and 100
  // assume hsl.l is between 0 and 100

  // convert s and l to percentages
  const adjustedS = hsl.s / 100;
  const adjustedL = hsl.l / 100;

  // if achromatic, m = L for r, g, and b
  if (hsl.s === 0) {
    const result = Math.round(hsl.l * 255);
    return { r: result, g: result, b: result };
  }

  // calculate chroma based on value of L
  const c =
    adjustedL < 0.5
      ? 2 * adjustedL * adjustedS
      : 2 * adjustedS * (1 - adjustedL);

  // calculate m
  const m = adjustedL - c / 2;

  // return r, g, and b rounded to the nearest integer
  return {
    r: Math.round(255 * (m + hueToRgb(c, hsl.h + 120))),
    g: Math.round(255 * (m + hueToRgb(c, hsl.h))),
    b: Math.round(255 * (m + hueToRgb(c, hsl.h - 120))),
  };
};

// Step 2. Convert RGB to HEX
const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export { hexToRgb, rgbToHsl, hslToRgb, rgbToHex };
