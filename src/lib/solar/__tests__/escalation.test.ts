import { describe, expect, it } from "vitest";
import { projectUtilityValue } from "@/lib/solar/escalation";

describe("projectUtilityValue", () => {
  it("calculates first-year utility value", () => {
    const projection = projectUtilityValue({
      annualProductionKwh: 15000,
      utilityRatePerKwh: 0.15,
      years: 10,
    });

    expect(projection.firstYearUtilityValue).toBe(2250);
  });

  it("projects higher utility value when escalation is applied", () => {
    const projection = projectUtilityValue({
      annualProductionKwh: 15000,
      utilityRatePerKwh: 0.15,
      utilityEscalationRate: 0.04,
      years: 10,
    });

    expect(projection.projectedUtilityValue).toBeGreaterThan(
      projection.firstYearUtilityValue * 10
    );
  });
});