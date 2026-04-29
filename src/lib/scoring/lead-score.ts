import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";

export function calculateLeadScore(input: LeadInput): number {
  let score = 0;

  if (input.billRange === "250-plus") score += 40;
  if (input.billRange === "150-250") score += 25;
  if (input.billRange === "100-150") score += 10;

  if (input.ownership === "owner") score += 25;

  if (input.timeline === "asap") score += 20;
  if (input.timeline === "1-3-months") score += 10;
  if (input.timeline === "exploring") score += 5;

  if (input.ownership === "owner" && input.billRange !== "100-150") {
    score += 15;
  } else if (input.ownership === "owner") {
    score += 8;
  }

  return Math.min(score, 100);
}

export function classifyLead(score: number) {
  if (score >= 80) return "High Intent";
  if (score >= 50) return "Medium Priority";
  return "Low Priority";
}

export function getRecommendedAction(score: number, input: LeadInput) {
  if (input.ownership !== "owner") {
    return "Confirm decision-maker or property control before moving forward.";
  }

  if (score >= 80) {
    return "Push to book a solar consultation now.";
  }

  if (score >= 50) {
    return "Educate, answer objections, and offer a custom design.";
  }

  return "Nurture lightly unless motivation increases.";
}

export function getQualificationFlags(input: LeadInput, estimate: SolarEstimate) {
  const flags: string[] = [];

  if (input.billRange === "250-plus") flags.push("High electric bill");
  if (input.billRange === "150-250") flags.push("Moderate-to-high bill");
  if (input.ownership === "owner") flags.push("Property owner");
  if (input.ownership !== "owner") flags.push("Ownership issue");
  if (input.timeline === "asap") flags.push("Urgent timeline");
  if (input.timeline === "exploring") flags.push("Low urgency");
  if (estimate.solarFit === "strong") flags.push("Strong solar fit");
  if (estimate.confidence === "medium") flags.push("Good preliminary data");

  return flags;
}