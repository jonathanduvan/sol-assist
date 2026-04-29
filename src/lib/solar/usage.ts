export type ElectricityUsageEstimate = {
  monthlyKwh: number;
  annualKwh: number;
};

export function estimateElectricityUsageFromBill(params: {
  monthlyBillAmount: number;
  utilityRatePerKwh: number;
}): ElectricityUsageEstimate {
  const monthlyKwh = params.monthlyBillAmount / params.utilityRatePerKwh;

  return {
    monthlyKwh: Math.round(monthlyKwh),
    annualKwh: Math.round(monthlyKwh * 12),
  };
}