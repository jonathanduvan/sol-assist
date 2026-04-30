export type SavingsProjection = {
  years: number;
  firstYearUtilityValue: number;
  projectedUtilityValue: number;
  projectedSavings: number;
  utilityEscalationRate: number;
};

export function projectUtilityValue(params: {
  annualProductionKwh: number;
  utilityRatePerKwh: number;
  utilityEscalationRate?: number;
  years?: number;
}): SavingsProjection {
  const {
    annualProductionKwh,
    utilityRatePerKwh,
    utilityEscalationRate = 0.04,
    years = 10,
  } = params;

  const firstYearUtilityValue =
    annualProductionKwh * utilityRatePerKwh;

  let projectedUtilityValue = 0;

  for (let year = 1; year <= years; year += 1) {
    const escalatedRate =
      utilityRatePerKwh * Math.pow(1 + utilityEscalationRate, year - 1);

    projectedUtilityValue += annualProductionKwh * escalatedRate;
  }

  return {
    years,
    firstYearUtilityValue: Math.round(firstYearUtilityValue),
    projectedUtilityValue: Math.round(projectedUtilityValue),
    projectedSavings: Math.round(projectedUtilityValue),
    utilityEscalationRate,
  };
}