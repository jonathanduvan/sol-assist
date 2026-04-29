import { describe, expect, it } from "vitest";
import { estimateElectricityUsageFromBill } from "@/lib/solar/usage";

describe("estimateElectricityUsageFromBill", () => {
  it("estimates monthly and annual kWh from bill and utility rate", () => {
    const usage = estimateElectricityUsageFromBill({
      monthlyBillAmount: 300,
      utilityRatePerKwh: 0.15,
    });

    expect(usage.monthlyKwh).toBe(2000);
    expect(usage.annualKwh).toBe(24000);
  });
});