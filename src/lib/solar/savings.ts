export type MonthlySavingsEstimate = {
  minMonthlySavings: number;
  maxMonthlySavings: number;
  label: string;
};

export function estimateMonthlySavingsRange(params: {
  annualProductionKwh: number;
  utilityRatePerKwh: number;
  offsetMin?: number;
  offsetMax?: number;
}): MonthlySavingsEstimate {
  const {
    annualProductionKwh,
    utilityRatePerKwh,
    offsetMin = 0.8,
    offsetMax = 0.95,
  } = params;

  const minMonthlySavings = Math.round(
    (annualProductionKwh * utilityRatePerKwh * offsetMin) / 12
  );

  const maxMonthlySavings = Math.round(
    (annualProductionKwh * utilityRatePerKwh * offsetMax) / 12
  );

  return {
    minMonthlySavings,
    maxMonthlySavings,
    label: `$${minMonthlySavings}–$${maxMonthlySavings}/month`,
  };
}

export function formatAnnualProductionRange(params: {
  minKw: number;
  maxKw: number;
  regionFactorKwhPerKw: number;
}) {
  const minProduction = Math.round(params.minKw * params.regionFactorKwhPerKw);
  const maxProduction = Math.round(params.maxKw * params.regionFactorKwhPerKw);

  return `${minProduction.toLocaleString()}–${maxProduction.toLocaleString()} kWh/year`;
}