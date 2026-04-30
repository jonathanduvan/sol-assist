"use client";

import { useEffect, useState } from "react";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { fetchExternalSolarEstimate } from "@/lib/solar/client/fetch-external-solar-estimate";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
};

export function PvWattsValidation({ lead, estimate }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [annualProduction, setAnnualProduction] = useState<number | null>(null);

  useEffect(() => {
    async function run() {
      const lat = lead.selectedAddress?.latitude;
      const lng = lead.selectedAddress?.longitude;

      if (!lat || !lng) {
        setStatus("unavailable");
        return;
      }

      setStatus("loading");

      try {
        const response = await fetchExternalSolarEstimate({
          latitude: lat,
          longitude: lng,
          systemCapacityKw: estimate.systemSizeMidpointKw,
        });

        const pvWatts = response.data?.pvWatts;

        if (!response.ok || !pvWatts) {
          setStatus("unavailable");
          return;
        }

        setAnnualProduction(pvWatts.annualProductionKwh);
        setStatus("ready");
      } catch {
        setStatus("unavailable");
      }
    }

    run();
  }, [lead.selectedAddress?.latitude, lead.selectedAddress?.longitude, estimate.systemSizeMidpointKw]);

  if (status === "loading") {
    return <p className="text-sm text-muted-foreground">Checking PVWatts production model...</p>;
  }

  if (status !== "ready" || annualProduction === null) {
    return null;
  }

  return (
    <div className="rounded-2xl border bg-muted/40 p-4 text-sm">
      <p className="font-medium">PVWatts production check</p>
      <p className="mt-1 text-muted-foreground">
        NREL PVWatts estimates this system could produce about{" "}
        <span className="font-medium text-foreground">
          {annualProduction.toLocaleString()} kWh/year
        </span>{" "}
        at this location.
      </p>
    </div>
  );
}