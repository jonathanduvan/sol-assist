import type { UtilityProvider } from "@/types/solar";
import type { SupportedSolarState } from "./region-solassist";

export const STATE_UTILITY_RATE_ASSUMPTIONS_PER_KWH: Record<
  SupportedSolarState,
  number
> = {
  FL: 0.15,
  GA: 0.14,
  DEFAULT: 0.14,
};

export const PROVIDER_UTILITY_RATE_ASSUMPTIONS_PER_KWH: Record<
  UtilityProvider,
  number
> = {
  fpl: 0.15,
  "duke-energy": 0.145,
  "georgia-power": 0.14,
  "state-default": 0.14,
  unknown: 0.14,
};