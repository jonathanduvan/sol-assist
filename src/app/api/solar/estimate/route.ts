import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchPvWattsEstimate } from "@/lib/solar/providers/pvwatts";

const solarEstimateSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  systemCapacityKw: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = solarEstimateSchema.parse(body);

    const pvWatts = await fetchPvWattsEstimate({
      latitude: input.latitude,
      longitude: input.longitude,
      systemCapacityKw: input.systemCapacityKw,
    });

    return NextResponse.json({
      ok: true,
      data: {
        pvWatts,
        source: {
          pvWattsAvailable: Boolean(pvWatts),
        },
      },
    });
  } catch (error) {
    console.error("PVWatts estimate API failed", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Could not calculate PVWatts estimate",
      },
      { status: 400 }
    );
  }
}