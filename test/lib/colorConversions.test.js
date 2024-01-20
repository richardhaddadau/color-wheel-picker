import { hexToRgb, rgbToHex } from "../../src/lib/colorConversions";

describe("Color Conversion Tests", () => {
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
