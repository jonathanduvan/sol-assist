import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead-schema";
import { saveLeadToNotion } from "@/lib/notion/save-lead";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const lead = leadSchema.parse(json);

    await saveLeadToNotion(lead);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Failed to save lead", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to save lead",
      },
      {
        status: 400,
      }
    );
  }
}