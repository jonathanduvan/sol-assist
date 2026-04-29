import type { UtilityProvider } from "@/types/solar";
import type { SupportedSolarState } from "@/lib/solar/data/region-solassist";

export function inferUtilityProvider(params: {
  state: SupportedSolarState;
  address: string;
}): UtilityProvider {
  const address = params.address.toLowerCase();

  if (params.state === "GA") {
    return "georgia-power";
  }

  if (params.state === "FL") {
    if (
      address.includes("miami") ||
      address.includes("fort lauderdale") ||
      address.includes("coral springs") ||
      address.includes("dania beach") ||
      address.includes("broward") ||
      address.includes("palm beach")
    ) {
      return "fpl";
    }

    if (
      address.includes("st petersburg") ||
      address.includes("saint petersburg") ||
      address.includes("clearwater") ||
      address.includes("pinellas")
    ) {
      return "duke-energy";
    }

    return "state-default";
  }

  return "unknown";
}

export function formatUtilityProvider(provider: UtilityProvider): string {
  switch (provider) {
    case "fpl":
      return "FPL";
    case "duke-energy":
      return "Duke Energy";
    case "georgia-power":
      return "Georgia Power";
    case "state-default":
      return "State Default";
    case "unknown":
    default:
      return "Unknown";
  }
}