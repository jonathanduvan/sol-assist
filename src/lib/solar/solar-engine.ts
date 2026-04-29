import { LeadInput } from "@/types/lead";
import { SolarEstimate } from "@/types/solar";

export function estimateSolar(
 input: LeadInput
): SolarEstimate {

 let systemSize="4–6 kW";
 let savings="$40–90/month";
 let annual="6,000–9,000 kWh/year";

 if (input.billRange==="150-250") {
   systemSize="6–9 kW";
   savings="$80–140/month";
   annual="9,000–13,500 kWh/year";
 }

 if (input.billRange==="250-plus") {
   systemSize="8–12 kW";
   savings="$120–180/month";
   annual="12,000–18,000 kWh/year";
 }

 return {
   solarFit:
     input.ownership==="owner"
      ? "Strong"
      : "Limited",

   systemSizeRangeKw: systemSize,

   estimatedSavingsMonthly: savings,

   annualProductionKwh: annual,

   confidence: "Medium"
 };
}