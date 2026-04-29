export type SolarFit = "strong" | "moderate" | "limited";
export type ConfidenceLevel = "high" | "medium" | "low";

export type SolarEstimate = {
  solarFit: SolarFit;
  systemSizeRangeKw: string;
  estimatedSavingsMonthly: string;
  annualProductionKwh: string;
  confidence: ConfidenceLevel;
  regionFactorKwhPerKw: number;
  utilityRatePerKwh: number;
  utilityProvider: UtilityProvider;
};

export type UtilityProvider =
  | "fpl"
  | "duke-energy"
  | "georgia-power"
  | "state-default"
  | "unknown";