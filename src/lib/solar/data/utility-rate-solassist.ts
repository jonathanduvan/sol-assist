import type { SupportedSolarState } from "./region-solassist";

export const UTILITY_RATE_ASSUMPTIONS_PER_KWH: Record<
  SupportedSolarState,
  number
> = {
  FL: 0.15,
  GA: 0.14,
  DEFAULT: 0.14,
};