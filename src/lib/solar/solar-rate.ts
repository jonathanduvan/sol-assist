export type SolarRateProjection = {
  solarRatePerKwh: number;
  solarEscalationRate: number;
  firstYearSolarCost: number;
  tenYearSolarCost: number;
};

export function projectSolarRateCost(params: {
  annualProductionKwh: number;
  solarRatePerKwh?: number;
  solarEscalationRate?: number;
  years?: number;
}): SolarRateProjection {
  const {
    annualProductionKwh,
    solarRatePerKwh = 0.115,
    solarEscalationRate = 0.029,
    years = 10,
  } = params;

  const firstYearSolarCost = annualProductionKwh * solarRatePerKwh;

  let tenYearSolarCost = 0;

  for (let year = 1; year <= years; year += 1) {
    const escalatedSolarRate =
      solarRatePerKwh * Math.pow(1 + solarEscalationRate, year - 1);

    tenYearSolarCost += annualProductionKwh * escalatedSolarRate;
  }

  return {
    solarRatePerKwh,
    solarEscalationRate,
    firstYearSolarCost: Math.round(firstYearSolarCost),
    tenYearSolarCost: Math.round(tenYearSolarCost),
  };
}