import { describe, expect, it } from "vitest";
import { estimateCommercialFinancials } from "@/lib/solar/commercial-financials";

describe("estimateCommercialFinancials", () => {
  it("calculates annual savings from monthly savings", () => {
    const estimate = estimateCommercialFinancials({
      systemSizeMinKw: 50,
      systemSizeMaxKw: 80,
      monthlySavingsMin: 1000,
      monthlySavingsMax: 1800,
    });

    expect(estimate.annualSavingsMin).toBe(12000);
    expect(estimate.annualSavingsMax).toBe(21600);
  });

  it("calculates system cost using commercial cost-per-watt assumptions", () => {
    const estimate = estimateCommercialFinancials({
      systemSizeMinKw: 50,
      systemSizeMaxKw: 80,
      monthlySavingsMin: 1000,
      monthlySavingsMax: 1800,
    });

    expect(estimate.estimatedSystemCostMin).toBe(112500);
    expect(estimate.estimatedSystemCostMax).toBe(260000);
  });

  it("calculates federal tax credit using 30 percent default assumption", () => {
    const estimate = estimateCommercialFinancials({
      systemSizeMinKw: 50,
      systemSizeMaxKw: 80,
      monthlySavingsMin: 1000,
      monthlySavingsMax: 1800,
    });

    expect(estimate.federalTaxCreditRate).toBe(0.3);
    expect(estimate.estimatedFederalTaxCreditMin).toBe(33750);
    expect(estimate.estimatedFederalTaxCreditMax).toBe(78000);
  });

  it("calculates payback after federal tax credit", () => {
    const estimate = estimateCommercialFinancials({
      systemSizeMinKw: 50,
      systemSizeMaxKw: 80,
      monthlySavingsMin: 1000,
      monthlySavingsMax: 1800,
    });

    expect(estimate.estimatedPaybackYearsMin).toBeGreaterThan(0);
    expect(estimate.estimatedPaybackYearsMax).toBeGreaterThan(
      estimate.estimatedPaybackYearsMin
    );
  });
});