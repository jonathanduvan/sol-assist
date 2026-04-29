import { describe, expect, it } from "vitest";
import { estimateSystemSize } from "@/lib/solar/system-size";

describe("estimateSystemSize", () => {
  it("uses bill range fallback when no exact bill is provided", () => {
    const estimate = estimateSystemSize({
      billRange: "150-250",
      utilityRatePerKwh: 0.15,
      regionFactorKwhPerKw: 1500,
      customerType: "residential",
    });

    expect(estimate.minKw).toBe(6);
    expect(estimate.maxKw).toBe(9);
    expect(estimate.midpointKw).toBe(7.5);
  });

  it("uses exact monthly bill when provided and respects 85%+ offset", () => {
    const estimate = estimateSystemSize({
      billRange: "250-plus",
      monthlyBillAmount: 300,
      utilityRatePerKwh: 0.15,
      regionFactorKwhPerKw: 1500,
      customerType: "residential",
    });

    expect(estimate.midpointKw).toBeGreaterThan(10);
    expect(estimate.minKw).toBeLessThan(estimate.midpointKw);
    expect(estimate.maxKw).toBeGreaterThan(estimate.midpointKw);
  });

  it("produces smaller systems for lower offset commercial scenarios", () => {
    const residentialEstimate = estimateSystemSize({
      billRange: "250-plus",
      monthlyBillAmount: 300,
      utilityRatePerKwh: 0.15,
      regionFactorKwhPerKw: 1500,
      customerType: "residential",
    });

    const commercialEstimate = estimateSystemSize({
      billRange: "250-plus",
      monthlyBillAmount: 300,
      utilityRatePerKwh: 0.15,
      regionFactorKwhPerKw: 1500,
      customerType: "commercial",
    });

    expect(commercialEstimate.midpointKw).toBeLessThan(
      residentialEstimate.midpointKw
    );
  });

  it("rounds system sizes to nearest 0.5 kW", () => {
    const estimate = estimateSystemSize({
      billRange: "250-plus",
      monthlyBillAmount: 287,
      utilityRatePerKwh: 0.15,
      regionFactorKwhPerKw: 1500,
      customerType: "residential",
    });

    expect(estimate.midpointKw * 2).toBe(Math.round(estimate.midpointKw * 2));
  });
});