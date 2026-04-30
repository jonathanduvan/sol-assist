"use client";

import { useEffect, useMemo, useState } from "react";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { fetchExternalSolarEstimate } from "@/lib/solar/client/fetch-external-solar-estimate";

type PvWattsStatus = "idle" | "loading" | "ready" | "unavailable";

export type PvWattsAdjustedEstimate = {
  status: PvWattsStatus;
  annualProductionKwh: number | null;
  estimatedSavingsMonthly: string | null;
  confidenceLabel: string;
};

function formatMonthlySavings(params: {
  annualProductionKwh: number;
  utilityRatePerKwh: number;
}) {
  const min = Math.round(
    (params.annualProductionKwh * params.utilityRatePerKwh * 0.8) / 12
  );

  const max = Math.round(
    (params.annualProductionKwh * params.utilityRatePerKwh * 0.95) / 12
  );

  return `$${min.toLocaleString()}–$${max.toLocaleString()}/month`;
}

export function usePvWattsEstimate(params: {
  lead: LeadInput;
  estimate: SolarEstimate;
}): PvWattsAdjustedEstimate {
  const { lead, estimate } = params;

  const [status, setStatus] = useState<PvWattsStatus>("idle");
  const [annualProductionKwh, setAnnualProductionKwh] =
    useState<number | null>(null);

  useEffect(() => {
    let isActive = true;

    async function run() {
      const latitude = lead.selectedAddress?.latitude;
      const longitude = lead.selectedAddress?.longitude;

      if (!latitude || !longitude) {
        setStatus("unavailable");
        return;
      }

      setStatus("loading");

      try {
        const response = await fetchExternalSolarEstimate({
          latitude,
          longitude,
          systemCapacityKw: estimate.systemSizeMidpointKw,
        });

        const pvWatts = response.data?.pvWatts;

        if (!isActive) return;

        if (!response.ok || !pvWatts) {
          setStatus("unavailable");
          return;
        }

        setAnnualProductionKwh(pvWatts.annualProductionKwh);
        setStatus("ready");
      } catch {
        if (!isActive) return;
        setStatus("unavailable");
      }
    }

    run();

    return () => {
      isActive = false;
    };
  }, [
    lead.selectedAddress?.latitude,
    lead.selectedAddress?.longitude,
    estimate.systemSizeMidpointKw,
  ]);

  const estimatedSavingsMonthly = useMemo(() => {
    if (!annualProductionKwh) return null;

    return formatMonthlySavings({
      annualProductionKwh,
      utilityRatePerKwh: estimate.utilityRatePerKwh,
    });
  }, [annualProductionKwh, estimate.utilityRatePerKwh]);

  return {
    status,
    annualProductionKwh,
    estimatedSavingsMonthly,
    confidenceLabel:
      status === "ready" ? "PVWatts-adjusted" : estimate.confidence,
  };
}