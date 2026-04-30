export type PvWattsRequest = {
  latitude: number;
  longitude: number;
  systemCapacityKw: number;
  tilt?: number;
  azimuth?: number;
  losses?: number;
};

export type PvWattsResult = {
  annualProductionKwh: number;
  monthlyProductionKwh: number[];
  capacityFactor: number | null;
};

export async function fetchPvWattsEstimate(
  request: PvWattsRequest
): Promise<PvWattsResult | null> {
  const apiKey = process.env.NREL_API_KEY;

  if (!apiKey) {
    console.warn("Missing NREL_API_KEY");
    return null;
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    lat: String(request.latitude),
    lon: String(request.longitude),
    system_capacity: String(request.systemCapacityKw),
    module_type: "1",
    array_type: "1",
    tilt: String(request.tilt ?? 20),
    azimuth: String(request.azimuth ?? 180),
    losses: String(request.losses ?? 14),
    timeframe: "monthly",
  });

  const response = await fetch(
    `https://developer.nrel.gov/api/pvwatts/v8.json?${params.toString()}`
  );

  if (!response.ok) {
    console.warn("PVWatts request failed", await response.text());
    return null;
  }

  const data = await response.json();

  return {
    annualProductionKwh: Math.round(data.outputs.ac_annual),
    monthlyProductionKwh: data.outputs.ac_monthly ?? [],
    capacityFactor:
      typeof data.outputs.capacity_factor === "number"
        ? data.outputs.capacity_factor
        : null,
  };
}