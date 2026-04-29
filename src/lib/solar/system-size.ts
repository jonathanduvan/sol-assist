import type { BillRange, CustomerType } from "@/types/lead";
import { estimateElectricityUsageFromBill } from "@/lib/solar/usage";
import { getTargetOffset } from "@/lib/solar/offset";

export type SystemSizeEstimate = {
  minKw: number;
  maxKw: number;
  midpointKw: number;
  label: string;
};

export function estimateSystemSize(params: {
  billRange: BillRange;
  monthlyBillAmount?: number;
  utilityRatePerKwh: number;
  regionFactorKwhPerKw: number;
  customerType: CustomerType;
}): SystemSizeEstimate {
  if (params.monthlyBillAmount && params.monthlyBillAmount > 0) {
    return estimateSystemSizeFromMonthlyBill({
      monthlyBillAmount: params.monthlyBillAmount,
      utilityRatePerKwh: params.utilityRatePerKwh,
      regionFactorKwhPerKw: params.regionFactorKwhPerKw,
      targetOffset: getTargetOffset({
        customerType: params.customerType,
        billRange: params.billRange,
      }),
    });
  }

  return estimateSystemSizeFromBillRange(params.billRange);
}

function estimateSystemSizeFromMonthlyBill(params: {
  monthlyBillAmount: number;
  utilityRatePerKwh: number;
  regionFactorKwhPerKw: number;
  targetOffset: number;
}): SystemSizeEstimate {
  const usage = estimateElectricityUsageFromBill({
    monthlyBillAmount: params.monthlyBillAmount,
    utilityRatePerKwh: params.utilityRatePerKwh,
  });

  const annualKwh = usage.annualKwh;

  const midpointKw =
    (annualKwh * params.targetOffset) / params.regionFactorKwhPerKw;

  const minKw = roundToHalf(midpointKw * 0.85);
  const maxKw = roundToHalf(midpointKw * 1.15);

  return {
    minKw,
    maxKw,
    midpointKw: roundToHalf(midpointKw),
    label: `${minKw}–${maxKw} kW`,
  };
}

function estimateSystemSizeFromBillRange(
  billRange: BillRange
): SystemSizeEstimate {
  switch (billRange) {
    case "250-plus":
      return {
        minKw: 8,
        maxKw: 12,
        midpointKw: 10,
        label: "8–12 kW",
      };

    case "150-250":
      return {
        minKw: 6,
        maxKw: 9,
        midpointKw: 7.5,
        label: "6–9 kW",
      };

    case "100-150":
    default:
      return {
        minKw: 4,
        maxKw: 6,
        midpointKw: 5,
        label: "4–6 kW",
      };
  }
}

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}