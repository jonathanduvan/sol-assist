import type { SelectedPropertyAddress } from "@/types/lead";
import type { SupportedSolarState } from "./data/region-solassist";

export function inferStateFromLeadAddress(params: {
  address: string;
  selectedAddress?: SelectedPropertyAddress;
}): SupportedSolarState {
  const stateCode = params.selectedAddress?.stateCode?.toUpperCase();

  if (stateCode === "FL") return "FL";
  if (stateCode === "GA") return "GA";

  return inferStateFromAddressString(params.address);
}

function inferStateFromAddressString(address: string): SupportedSolarState {
  const normalized = address.toUpperCase();

  if (normalized.includes(" FL") || normalized.includes("FLORIDA")) {
    return "FL";
  }

  if (normalized.includes(" GA") || normalized.includes("GEORGIA")) {
    return "GA";
  }

  return "DEFAULT";
}