import type { LeadInput } from "@/types/lead";
import type { ConfidenceLevel, SolarEstimate, SolarFit } from "@/types/solar";
import { REGION_PRODUCTION_FACTORS_KWH_PER_KW_YEAR } from "@/lib/solar/data/region-solassist";
import { PROVIDER_UTILITY_RATE_ASSUMPTIONS_PER_KWH } from "@/lib/solar/data/utility-rate-solassist";
import { inferUtilityProvider } from "@/lib/solar/utility-provider";
import { inferStateFromLeadAddress } from "@/lib/solar/state-utils";
import { estimateSystemSize } from "@/lib/solar/system-size";
import {
  estimateAnnualProductionRange,
  estimateMonthlySavingsRange,
} from "@/lib/solar/savings";

export function estimateSolar(input: LeadInput): SolarEstimate {
  const state = inferStateFromLeadAddress({
    address: input.address,
    selectedAddress: input.selectedAddress,
  });

  const regionFactorKwhPerKw =
    REGION_PRODUCTION_FACTORS_KWH_PER_KW_YEAR[state];

  const utilityProvider = inferUtilityProvider({
    state,
    address: input.address,
  });

  const utilityRatePerKwh =
    PROVIDER_UTILITY_RATE_ASSUMPTIONS_PER_KWH[utilityProvider];
    
  const systemSize = estimateSystemSize({
    billRange: input.billRange,
    monthlyBillAmount: input.monthlyBillAmount,
    utilityRatePerKwh,
  });
  
  const annualProduction = estimateAnnualProductionRange({
    minKw: systemSize.minKw,
    maxKw: systemSize.maxKw,
    midpointKw: systemSize.midpointKw,
    regionFactorKwhPerKw,
  });

  const savings = estimateMonthlySavingsRange({
    annualProductionKwh: annualProduction.midpointAnnualProductionKwh,
    utilityRatePerKwh,
  });

  return {
    solarFit: classifySolarFit(input),

    systemSizeRangeKw: systemSize.label,
    systemSizeMinKw: systemSize.minKw,
    systemSizeMaxKw: systemSize.maxKw,
    systemSizeMidpointKw: systemSize.midpointKw,

    estimatedSavingsMonthly: savings.label,
    monthlySavingsMin: savings.minMonthlySavings,
    monthlySavingsMax: savings.maxMonthlySavings,

    annualProductionKwh: annualProduction.label,
    annualProductionMinKwh: annualProduction.minAnnualProductionKwh,
    annualProductionMaxKwh: annualProduction.maxAnnualProductionKwh,
    annualProductionMidpointKwh: annualProduction.midpointAnnualProductionKwh,

    confidence: calculateConfidence(input),
    regionFactorKwhPerKw,
    utilityRatePerKwh,
    utilityProvider,
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