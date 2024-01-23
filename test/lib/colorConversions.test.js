import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "../../src/lib/colorConversions";

describe("Color Conversion Tests - One Way", () => {
  describe("HEX to RGB Conversion", () => {
    it("should convert #EF3224 to rgb(239, 50, 36)", () => {
      expect(hexToRgb("#EF3224")).toStrictEqual({ r: 239, g: 50, b: 36 });
    });

    it("should convert #463191 to rgb(70, 49, 145)", () => {
      expect(hexToRgb("#463191")).toStrictEqual({ r: 70, g: 49, b: 145 });
    });

    it("should convert #D0DD37 to rgb(208, 221, 55)", () => {
      expect(hexToRgb("#D0DD37")).toStrictEqual({ r: 208, g: 221, b: 55 });
    });
  });

  describe("RGB to HSL Conversion", () => {
    it("should convert rgb(239, 50, 36) to hsl(4, 86, 54)", () => {
      expect(rgbToHsl({ r: 239, g: 50, b: 36 })).toStrictEqual({
        h: 4,
        s: 86,
        l: 54,
      });
    });

    it("should convert rgb(249, 155, 32) to hsl(34, 95, 55)", () => {
      expect(rgbToHsl({ r: 249, g: 155, b: 32 })).toStrictEqual({
        h: 34,
        s: 95,
        l: 55,
      });
    });

    it("should convert rgb(20, 150, 206) to hsl(198, 82, 44)", () => {
      expect(rgbToHsl({ r: 20, g: 150, b: 206 })).toStrictEqual({
        h: 198,
        s: 82,
        l: 44,
      });
    });
  });

  describe("HSL to RGB Conversion", () => {
    it("should convert hsl(4, 86, 54) to rgb(239, 50, 37)", () => {
      expect(hslToRgb({ h: 4, s: 86, l: 54 })).toStrictEqual({
        r: 239,
        g: 50,
        b: 37,
      });
    });

    it("should convert hsl(34, 95, 55) to rgb(249, 155, 31)", () => {
      expect(hslToRgb({ h: 34, s: 95, l: 55 })).toStrictEqual({
        r: 249,
        g: 155,
        b: 31,
      });
    });

    it("should convert hsl(253, 50, 38) to rgb(69, 48, 145)", () => {
      expect(hslToRgb({ h: 253, s: 50, l: 38 })).toStrictEqual({
        r: 69,
        g: 48,
        b: 145,
      });
    });
  });

  describe("RGB to HEX Conversion", () => {
    it("should convert rgb(20, 150, 206) to #1496CE", () => {
      expect(rgbToHex(20, 150, 206)).toBe("#1496CE");
    });

    it("should convert rgb(249, 155, 30) to #F99B1E", () => {
      expect(rgbToHex(249, 155, 30)).toBe("#F99B1E");
    });

    it("should convert rgb(167, 30, 72) to #A71E48", () => {
      expect(rgbToHex(167, 30, 72)).toBe("#A71E48");
    });
  });
});

describe("Color Conversion Tests - Round Trip", () => {
  it("should correctly convert HEX to RGB and back to HEX", () => {
    const originalHex = "#EF3224";
    const rgb = hexToRgb(originalHex);
    const roundTripHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    expect(roundTripHex).toBe(originalHex);
  });

  it("should correctly convert RGB to HSL and back to RGB", () => {
    const originalRgb = { r: 239, g: 50, b: 36 };
    const hsl = rgbToHsl(originalRgb);
    const roundTripRgb = hslToRgb(hsl);
    expect(roundTripRgb).toStrictEqual(originalRgb);
  });

  it("should correctly convert HSL to RGB and back to HSL", () => {
    const originalHsl = { h: 4, s: 86, l: 54 };
    const rgb = hslToRgb(originalHsl);
    const roundTripHsl = rgbToHsl(rgb);
    expect(roundTripHsl).toStrictEqual(originalHsl);
  });
});
