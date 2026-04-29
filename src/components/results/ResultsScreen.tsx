"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { ResultMetricCard } from "./ResultMetricCard";
import { formatUtilityProvider } from "@/lib/solar/utility-provider";
import { CalculationBreakdown } from "./CalculationBreakdown";
import Link from "next/link";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
  score: number;
};

function formatPercentLabel(value: number) {
  return `${Math.round(value * 100)}¢/kWh`;
}

export function ResultsScreen({ lead, estimate, score }: Props) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const fitLabel =
    estimate.solarFit === "strong"
      ? "strong"
      : estimate.solarFit === "moderate"
        ? "moderate"
        : "limited";
  const billLabel = lead.monthlyBillAmount
  ? `$${lead.monthlyBillAmount}/month`
  : lead.billRange;

  return (
    <Card className="mx-auto w-full max-w-3xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Preliminary Solar Snapshot
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            This property looks like a {fitLabel} solar candidate.
          </h1>

          <p className="mt-4 text-muted-foreground">
            Estimate for {lead.address}. These numbers are based on your address, 
            electric bill, typical regional production, and assumed local energy rates.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <ResultMetricCard
            label="Estimated Savings"
            value={estimate.estimatedSavingsMonthly}
          />

          <ResultMetricCard
            label="System Size"
            value={estimate.systemSizeRangeKw}
          />

          <ResultMetricCard
            label="Annual Production"
            value={estimate.annualProductionKwh}
          />

          <ResultMetricCard
            label="Electric Bill"
            value={billLabel}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <ResultMetricCard
            label="Confidence"
            value={estimate.confidence}
          />

          <ResultMetricCard
            label="Assumed Rate"
            value={formatPercentLabel(estimate.utilityRatePerKwh)}
          />
          <ResultMetricCard
            label="Utility Estimate"
            value={formatUtilityProvider(estimate.utilityProvider)}
          />

          <ResultMetricCard
            label="Production Factor"
            value={`${estimate.regionFactorKwhPerKw} kWh/kW/yr`}
          />

        </div>
        <CalculationBreakdown estimate={estimate} />
        <Card className="rounded-2xl bg-muted">
          <CardContent className="space-y-2 p-4 text-sm text-muted-foreground">
            <p>
              Estimates are preliminary and based on typical solar production,
              local rate assumptions, and your provided bill range.
            </p>
            <p>
              Final system design and savings will vary after roof review,
              utility review, shading analysis, and financing selection.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          {bookingUrl ? (
            <Button size="lg" className="rounded-xl" asChild>
              <Link href={bookingUrl} target="_blank" rel="noreferrer">
                Book Free Solar Call
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="rounded-xl" disabled>
              Booking Link Not Set
            </Button>
          )}
          <Button size="lg" variant="outline" className="rounded-xl">
            Lead Score: {score}
          </Button>
          <p className="text-sm text-muted-foreground">
            Your custom design will verify roof space, utility rates, incentives, and final savings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}