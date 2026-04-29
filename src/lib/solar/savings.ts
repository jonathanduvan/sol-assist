export type MonthlySavingsEstimate = {
  minMonthlySavings: number;
  maxMonthlySavings: number;
  label: string;
};

export type AnnualProductionRange = {
  minAnnualProductionKwh: number;
  maxAnnualProductionKwh: number;
  midpointAnnualProductionKwh: number;
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
    label: `$${minMonthlySavings.toLocaleString()}–$${maxMonthlySavings.toLocaleString()}/month`,
  };
}

export function estimateAnnualProductionRange(params: {
  minKw: number;
  maxKw: number;
  midpointKw: number;
  regionFactorKwhPerKw: number;
}): AnnualProductionRange {
  const minAnnualProductionKwh = Math.round(
    params.minKw * params.regionFactorKwhPerKw
  );

  const maxAnnualProductionKwh = Math.round(
    params.maxKw * params.regionFactorKwhPerKw
  );

  const midpointAnnualProductionKwh = Math.round(
    params.midpointKw * params.regionFactorKwhPerKw
  );

  return {
    minAnnualProductionKwh,
    maxAnnualProductionKwh,
    midpointAnnualProductionKwh,
    label: `${minAnnualProductionKwh.toLocaleString()}–${maxAnnualProductionKwh.toLocaleString()} kWh/year`,
  };
}