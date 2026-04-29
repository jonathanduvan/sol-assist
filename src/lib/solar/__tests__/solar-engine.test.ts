import { describe, expect, it } from "vitest";
import { estimateSolar } from "@/lib/solar/solar-engine";
import type { LeadInput } from "@/types/lead";

const baseLead: LeadInput = {
  address: "218 E Dania Beach Blvd, Dania Beach, FL 33004",
  selectedAddress: {
    formattedAddress: "218 E Dania Beach Blvd, Dania Beach, FL 33004",
    placeId: "test-place-id",
    latitude: 26.0523,
    longitude: -80.1439,
    stateCode: "FL",
    city: "Dania Beach",
    postalCode: "33004",
  },
  customerType: "residential",
  billRange: "250-plus",
  monthlyBillAmount: 300,
  ownership: "owner",
  timeline: "asap",
  mode: "self",
};

describe("estimateSolar", () => {
  it("uses structured Florida address data for production and utility assumptions", () => {
    const estimate = estimateSolar(baseLead);

    expect(estimate.regionFactorKwhPerKw).toBe(1500);
    expect(estimate.utilityProvider).toBe("fpl");
    expect(estimate.utilityRatePerKwh).toBe(0.15);
  });

  it("returns structured numeric output for system size, production, and savings", () => {
    const estimate = estimateSolar(baseLead);

    expect(estimate.systemSizeMinKw).toBeGreaterThan(0);
    expect(estimate.systemSizeMaxKw).toBeGreaterThan(estimate.systemSizeMinKw);
    expect(estimate.annualProductionMidpointKwh).toBeGreaterThan(0);
    expect(estimate.monthlySavingsMax).toBeGreaterThan(estimate.monthlySavingsMin);
  });

  it("classifies non-owners as limited solar fit", () => {
    const estimate = estimateSolar({
      ...baseLead,
      ownership: "renter",
    });

    expect(estimate.solarFit).toBe("limited");
  });

  it("uses Georgia assumptions for Georgia addresses", () => {
    const estimate = estimateSolar({
      ...baseLead,
      address: "2813 Dalewood Drive, Columbus, GA 31907",
      selectedAddress: {
        ...baseLead.selectedAddress!,
        formattedAddress: "2813 Dalewood Drive, Columbus, GA 31907",
        stateCode: "GA",
        city: "Columbus",
        postalCode: "31907",
      },
    });

    expect(estimate.regionFactorKwhPerKw).toBe(1400);
    expect(estimate.utilityProvider).toBe("georgia-power");
  });
});