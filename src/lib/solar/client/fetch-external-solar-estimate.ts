export type ExternalSolarEstimateResponse = {
  ok: boolean;
  data?: {
    pvWatts: {
      annualProductionKwh: number;
      monthlyProductionKwh: number[];
      capacityFactor: number | null;
    } | null;
    source: {
      pvWattsAvailable: boolean;
    };
  };
  error?: string;
};

export async function fetchExternalSolarEstimate(params: {
  latitude: number;
  longitude: number;
  systemCapacityKw: number;
}): Promise<ExternalSolarEstimateResponse> {
  const response = await fetch("/api/solar/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return response.json();
}