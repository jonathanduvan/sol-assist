import { describe, expect, it } from "vitest";
import {
  estimateAnnualProductionRange,
  estimateMonthlySavingsRange,
} from "@/lib/solar/savings";

describe("solar savings calculations", () => {
  it("calculates annual production range from system size and production factor", () => {
    const production = estimateAnnualProductionRange({
      minKw: 8,
      maxKw: 12,
      midpointKw: 10,
      regionFactorKwhPerKw: 1500,
    });

    expect(production.minAnnualProductionKwh).toBe(12000);
    expect(production.maxAnnualProductionKwh).toBe(18000);
    expect(production.midpointAnnualProductionKwh).toBe(15000);
  });

  it("calculates monthly savings range from production, rate, and offset", () => {
    const savings = estimateMonthlySavingsRange({
      annualProductionKwh: 15000,
      utilityRatePerKwh: 0.15,
      offsetMin: 0.8,
      offsetMax: 0.95,
    });

    expect(savings.minMonthlySavings).toBe(150);
    expect(savings.maxMonthlySavings).toBe(178);
  });
});