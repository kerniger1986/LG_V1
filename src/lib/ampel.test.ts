import { describe, expect, it } from "vitest";
import { berechneAmpel } from "./ampel";

describe("berechneAmpel", () => {
  it("Grundstueck ist immer GELB", () => {
    const result = berechneAmpel({
      immobilientyp: "grundstueck",
      wohnflaeche: 500,
      vermietet: false,
      kaltmiete: null,
      preisvorstellung: 100000,
    });
    expect(result.ampel).toBe("gelb");
    expect(result.kaufpreisProM2).toBeNull();
  });

  it("fehlende Preisvorstellung ist GELB", () => {
    const result = berechneAmpel({
      immobilientyp: "haus",
      wohnflaeche: 120,
      vermietet: true,
      kaltmiete: 800,
      preisvorstellung: null,
    });
    expect(result.ampel).toBe("gelb");
  });

  it("vermietet, guenstig und hohe Rendite ist GRUEN", () => {
    // 180000 / 120 = 1500 EUR/m2; (900*12)/180000*100 = 6%... needs >=6.5
    const result = berechneAmpel({
      immobilientyp: "wohnung",
      wohnflaeche: 120,
      vermietet: true,
      kaltmiete: 1000,
      preisvorstellung: 180000,
    });
    // (1000*12)/180000*100 = 6.67%
    expect(result.kaufpreisProM2).toBe(1500);
    expect(result.mietrenditeProzent).toBeCloseTo(6.67, 1);
    expect(result.ampel).toBe("gruen");
  });

  it("vermietet, knapp unter Schwelle ist GELB (Toleranzband)", () => {
    // Kaufpreis/m2 = 2200 (innerhalb 2000-2500), Mietrendite = 6.0% (innerhalb 4.875-6.5)
    const result = berechneAmpel({
      immobilientyp: "haus",
      wohnflaeche: 100,
      vermietet: true,
      kaltmiete: 1100,
      preisvorstellung: 220000,
    });
    expect(result.kaufpreisProM2).toBe(2200);
    expect(result.ampel).toBe("gelb");
  });

  it("vermietet, weit ueber Schwelle ist ROT", () => {
    const result = berechneAmpel({
      immobilientyp: "haus",
      wohnflaeche: 100,
      vermietet: true,
      kaltmiete: 500,
      preisvorstellung: 400000,
    });
    expect(result.kaufpreisProM2).toBe(4000);
    expect(result.ampel).toBe("rot");
  });

  it("nicht vermietet, guenstiger Kaufpreis/m2 ist GRUEN ohne Mietrendite", () => {
    const result = berechneAmpel({
      immobilientyp: "haus",
      wohnflaeche: 150,
      vermietet: false,
      kaltmiete: null,
      preisvorstellung: 250000,
    });
    expect(result.kaufpreisProM2).toBe(1666.67);
    expect(result.mietrenditeProzent).toBeNull();
    expect(result.ampel).toBe("gruen");
  });

  it("nicht vermietet, Kaufpreis/m2 im Toleranzband ist GELB", () => {
    const result = berechneAmpel({
      immobilientyp: "wohnung",
      wohnflaeche: 100,
      vermietet: false,
      kaltmiete: null,
      preisvorstellung: 240000, // 2400 EUR/m2
    });
    expect(result.ampel).toBe("gelb");
  });

  it("nicht vermietet, Kaufpreis/m2 weit drueber ist ROT", () => {
    const result = berechneAmpel({
      immobilientyp: "wohnung",
      wohnflaeche: 100,
      vermietet: false,
      kaltmiete: null,
      preisvorstellung: 300000,
    });
    expect(result.ampel).toBe("rot");
  });

  it("vermietet aber Kaltmiete fehlt ist GELB", () => {
    const result = berechneAmpel({
      immobilientyp: "haus",
      wohnflaeche: 100,
      vermietet: true,
      kaltmiete: null,
      preisvorstellung: 180000,
    });
    expect(result.ampel).toBe("gelb");
    expect(result.kaufpreisProM2).toBe(1800);
  });
});
