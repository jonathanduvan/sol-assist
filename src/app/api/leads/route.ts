import { NextResponse } from "next/server";
import { leadCaptureSchema } from "@/lib/validation/lead-capture-schema";
import { saveLeadToNotion } from "@/lib/notion/save-lead";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = leadCaptureSchema.parse(json);

    await saveLeadToNotion(payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead save failed", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Lead save failed",
      },
      { status: 500 }
    );
  }
}