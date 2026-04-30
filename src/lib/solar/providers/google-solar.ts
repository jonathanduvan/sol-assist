export type GoogleSolarRequest = {
  latitude: number;
  longitude: number;
};

export type GoogleSolarResult = {
  maxSunshineHoursPerYear: number | null;
  wholeRoofStatsAreaMeters2: number | null;
  maxArrayPanelsCount: number | null;
  maxArrayAreaMeters2: number | null;
  yearlyEnergyDcKwh: number | null;
};

export async function fetchGoogleSolarBuildingInsights(
  request: GoogleSolarRequest
): Promise<GoogleSolarResult | null> {
  const apiKey = process.env.GOOGLE_SOLAR_API_KEY;

  if (!apiKey) {
    console.warn("Missing GOOGLE_SOLAR_API_KEY");
    return null;
  }

  const params = new URLSearchParams({
    "location.latitude": String(request.latitude),
    "location.longitude": String(request.longitude),
    requiredQuality: "MEDIUM",
    key: apiKey,
  });

  const response = await fetch(
    `https://solar.googleapis.com/v1/buildingInsights:findClosest?${params.toString()}`
  );

  if (!response.ok) {
    console.warn("Google Solar request failed", await response.text());
    return null;
  }

  const data = await response.json();

  const solarPotential = data.solarPotential;

  return {
    maxSunshineHoursPerYear:
      typeof solarPotential?.maxSunshineHoursPerYear === "number"
        ? solarPotential.maxSunshineHoursPerYear
        : null,

    wholeRoofStatsAreaMeters2:
      typeof solarPotential?.wholeRoofStats?.areaMeters2 === "number"
        ? solarPotential.wholeRoofStats.areaMeters2
        : null,

    maxArrayPanelsCount:
      typeof solarPotential?.maxArrayPanelsCount === "number"
        ? solarPotential.maxArrayPanelsCount
        : null,

    maxArrayAreaMeters2:
      typeof solarPotential?.maxArrayAreaMeters2 === "number"
        ? solarPotential.maxArrayAreaMeters2
        : null,

    yearlyEnergyDcKwh:
      typeof solarPotential?.solarPanels?.[0]?.yearlyEnergyDcKwh === "number"
        ? solarPotential.solarPanels[0].yearlyEnergyDcKwh
        : null,
  };
}