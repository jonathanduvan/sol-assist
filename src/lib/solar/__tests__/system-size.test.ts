import { describe, expect, it } from "vitest";
import { estimateSystemSize } from "@/lib/solar/system-size";

describe("estimateSystemSize", () => {
  it("uses bill range fallback when no exact bill is provided", () => {
    const estimate = estimateSystemSize({
      billRange: "150-250",
      utilityRatePerKwh: 0.15,
    });

    expect(estimate.minKw).toBe(6);
    expect(estimate.maxKw).toBe(9);
    expect(estimate.midpointKw).toBe(7.5);
  });

  it("uses exact monthly bill when provided", () => {
    const estimate = estimateSystemSize({
      billRange: "250-plus",
      monthlyBillAmount: 300,
      utilityRatePerKwh: 0.15,
    });

    expect(estimate.midpointKw).toBeGreaterThan(10);
    expect(estimate.minKw).toBeLessThan(estimate.midpointKw);
    expect(estimate.maxKw).toBeGreaterThan(estimate.midpointKw);
  });
});