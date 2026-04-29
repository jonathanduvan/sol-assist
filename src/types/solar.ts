export type SolarFit = "strong" | "moderate" | "limited";
export type ConfidenceLevel = "high" | "medium" | "low";

export type UtilityProvider =
  | "fpl"
  | "duke-energy"
  | "georgia-power"
  | "state-default"
  | "unknown";

export type SolarEstimate = {
  solarFit: SolarFit;

  systemSizeRangeKw: string;
  systemSizeMinKw: number;
  systemSizeMaxKw: number;
  systemSizeMidpointKw: number;

  estimatedSavingsMonthly: string;
  monthlySavingsMin: number;
  monthlySavingsMax: number;

  annualProductionKwh: string;
  annualProductionMinKwh: number;
  annualProductionMaxKwh: number;
  annualProductionMidpointKwh: number;

  confidence: ConfidenceLevel;
  regionFactorKwhPerKw: number;
  utilityRatePerKwh: number;
  utilityProvider: UtilityProvider;

  utilityEscalationRate: number;
  firstYearUtilityValue: number;
  tenYearUtilityValue: number;

  solarRatePerKwh: number;
  solarEscalationRate: number;
  firstYearSolarCost: number;
  tenYearSolarCost: number;
  tenYearEstimatedSavingsVsUtility: number;
};