import type { SupportedSolarState } from "./data/region-solassist";

export function inferStateFromAddress(address: string): SupportedSolarState {
  const normalized = address.toUpperCase();

  if (normalized.includes(" FL") || normalized.includes("FLORIDA")) {
    return "FL";
  }

  if (normalized.includes(" GA") || normalized.includes("GEORGIA")) {
    return "GA";
  }

  return "DEFAULT";
}