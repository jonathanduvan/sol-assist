"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { ResultMetricCard } from "./ResultMetricCard";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
  score: number;
};

export function ResultsScreen({ lead, estimate, score }: Props) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function saveLead() {
    setSaveStatus("saving");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...lead,
        score,
        solarFit: estimate.solarFit,
        estimatedSavingsMonthly: estimate.estimatedSavingsMonthly,
        systemSizeRangeKw: estimate.systemSizeRangeKw,
        annualProductionKwh: estimate.annualProductionKwh,
      }),
    });

    setSaveStatus(response.ok ? "saved" : "error");
  }

  return (
    <Card className="mx-auto w-full max-w-3xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Preliminary Solar Snapshot
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            This property looks like a {estimate.solarFit} solar candidate.
          </h1>

          <p className="mt-4 text-muted-foreground">
            These numbers are a quick estimate based on your inputs. A final proposal requires a full design and utility review.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ResultMetricCard label="Estimated Savings" value={estimate.estimatedSavingsMonthly} />
          <ResultMetricCard label="System Size" value={estimate.systemSizeRangeKw} />
          <ResultMetricCard label="Annual Production" value={estimate.annualProductionKwh} />
        </div>

        <Card className="rounded-2xl bg-muted">
          <CardContent className="p-4 text-sm text-muted-foreground">
            Estimates are based on typical solar production and local energy rate assumptions. Final system design and savings will vary.
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="rounded-xl" onClick={saveLead} disabled={saveStatus === "saving" || saveStatus === "saved"}>
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Lead Saved"
                : "Save Lead"}
          </Button>

          <Button size="lg" variant="outline" className="rounded-xl">
            Lead Score: {score}
          </Button>
        </div>

        {saveStatus === "error" && (
          <p className="text-sm text-red-600">
            Could not save this lead. Check your Notion settings and database fields.
          </p>
        )}
      </CardContent>
    </Card>
  );
}