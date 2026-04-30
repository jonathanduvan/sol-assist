import { describe, expect, it } from "vitest";
import { projectSolarRateCost } from "@/lib/solar/solar-rate";

describe("projectSolarRateCost", () => {
  it("calculates first-year solar rate cost", () => {
    const projection = projectSolarRateCost({
      annualProductionKwh: 15000,
      solarRatePerKwh: 0.115,
    });

    expect(projection.firstYearSolarCost).toBe(1725);
  });

  it("projects ten-year solar cost with escalation", () => {
    const projection = projectSolarRateCost({
      annualProductionKwh: 15000,
      solarRatePerKwh: 0.115,
      solarEscalationRate: 0.029,
      years: 10,
    });

    expect(projection.tenYearSolarCost).toBeGreaterThan(
      projection.firstYearSolarCost * 10
    );
  });
});