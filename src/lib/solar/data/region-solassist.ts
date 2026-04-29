export type SupportedSolarState = "FL" | "GA" | "DEFAULT";

export const REGION_PRODUCTION_FACTORS_KWH_PER_KW_YEAR: Record<
  SupportedSolarState,
  number
> = {
  FL: 1500,
  GA: 1400,
  DEFAULT: 1350,
};

