import type { LeadInput } from "@/types/lead";
import type { ConfidenceLevel, SolarEstimate, SolarFit } from "@/types/solar";
import { REGION_PRODUCTION_FACTORS_KWH_PER_KW_YEAR } from "@/lib/solar/data/region-solassist";
import { UTILITY_RATE_ASSUMPTIONS_PER_KWH } from "@/lib/solar/data/utility-rate-solassist";
import { inferStateFromAddress } from "@/lib/solar/state-utils";
import { estimateSystemSize } from "@/lib/solar/system-size";
import {
  estimateMonthlySavingsRange,
  formatAnnualProductionRange,
} from "@/lib/solar/savings";

export function estimateSolar(input: LeadInput): SolarEstimate {
  const state = inferStateFromAddress(input.address);

  const regionFactorKwhPerKw =
    REGION_PRODUCTION_FACTORS_KWH_PER_KW_YEAR[state];

  const utilityRatePerKwh = UTILITY_RATE_ASSUMPTIONS_PER_KWH[state];

  const systemSize = estimateSystemSize({
    billRange: input.billRange,
    monthlyBillAmount: input.monthlyBillAmount,
    utilityRatePerKwh,
  });
  
  const annualProductionMidpoint =
    systemSize.midpointKw * regionFactorKwhPerKw;

  const savings = estimateMonthlySavingsRange({
    annualProductionKwh: annualProductionMidpoint,
    utilityRatePerKwh,
  });

  return {
    solarFit: classifySolarFit(input),
    systemSizeRangeKw: systemSize.label,
    estimatedSavingsMonthly: savings.label,
    annualProductionKwh: formatAnnualProductionRange({
      minKw: systemSize.minKw,
      maxKw: systemSize.maxKw,
      regionFactorKwhPerKw,
    }),
    confidence: calculateConfidence(input),
    regionFactorKwhPerKw,
    utilityRatePerKwh,
  };
}

function classifySolarFit(input: LeadInput): SolarFit {
  if (input.ownership !== "owner") return "limited";

  if (input.billRange === "250-plus" || input.billRange === "150-250") {
    return "strong";
  }

  return "moderate";
}

function calculateConfidence(input: LeadInput): ConfidenceLevel {
  if (
    input.selectedAddress?.latitude &&
    input.selectedAddress?.longitude &&
    input.address &&
    input.billRange
  ) {
    return "medium";
  }

  return "low";
}