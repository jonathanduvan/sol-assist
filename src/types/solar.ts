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

  annualSavingsMin: number;
  annualSavingsMax: number;
  annualSavingsLabel: string;

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

  // Commercial / financial estimates
  estimatedSystemCostMin: number;
  estimatedSystemCostMax: number;
  estimatedSystemCostLabel: string;

  federalTaxCreditRate: number;
  estimatedFederalTaxCreditMin: number;
  estimatedFederalTaxCreditMax: number;
  estimatedFederalTaxCreditLabel: string;

  estimatedPaybackYearsMin: number;
  estimatedPaybackYearsMax: number;
  estimatedPaybackLabel: string;
};

export type ExternalSolarEstimate = {
  pvWattsAnnualProductionKwh: number | null;
  pvWattsMonthlyProductionKwh: number[];
  pvWattsCapacityFactor: number | null;
  pvWattsAvailable: boolean;
};