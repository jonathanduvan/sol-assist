"use client";

import { CheckCircle2, Info, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { formatUtilityProvider } from "@/lib/solar/utility-provider";
import { usePvWattsEstimate } from "@/hooks/use-pvwatts-estimate";
import { CalculationBreakdown } from "./CalculationBreakdown";
import { LeadCaptureBooking } from "./LeadCaptureBooking";
import { PvWattsValidation } from "./PvWattsValidation";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
  score: number;
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

function formatRate(value: number) {
  return `${Math.round(value * 100)}¢/kWh`;
}

function getFitHeadline(fit: SolarEstimate["solarFit"]) {
  if (fit === "strong") return "This property looks like a strong solar candidate";
  if (fit === "moderate") return "This property may be a good solar candidate";
  return "This property may need a closer review";
}

function getFitDescription(fit: SolarEstimate["solarFit"]) {
  if (fit === "strong") {
    return "Your bill, ownership status, and location suggest solar could be worth exploring.";
  }

  if (fit === "moderate") {
    return "There may be savings potential, but a custom review would help confirm the opportunity.";
  }

  return "Solar may still be possible, but property control or usage details need to be reviewed first.";
}

export function ResultsScreen({ lead, estimate, score }: Props) {
  const billLabel = lead.monthlyBillAmount
    ? `$${lead.monthlyBillAmount.toLocaleString()}/month`
    : lead.billRange;

  const fitHeadline = getFitHeadline(estimate.solarFit);
  const fitDescription = getFitDescription(estimate.solarFit);

  const pvWattsEstimate = usePvWattsEstimate({ lead, estimate });

  const displayedSavings =
    pvWattsEstimate.estimatedSavingsMonthly ?? estimate.estimatedSavingsMonthly;

  const displayedAnnualProduction = pvWattsEstimate.annualProductionKwh
    ? `${pvWattsEstimate.annualProductionKwh.toLocaleString()} kWh/year`
    : estimate.annualProductionKwh;

  const confidenceLabel = pvWattsEstimate.confidenceLabel;

  return (
    <Card className="mx-auto w-full max-w-3xl rounded-3xl">
      <CardContent className="space-y-8 p-6 md:p-8">
        <section className="space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Sun className="h-7 w-7" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Preliminary Solar Snapshot
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {fitHeadline}
            </h1>

            <p className="mx-auto max-w-2xl text-muted-foreground">
              {fitDescription}
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <PrimaryMetric
            label="Estimated Monthly Savings"
            value={displayedSavings}
            helper="Based on estimated solar production"
            featured
          />

          <PrimaryMetric
            label="Estimated System Size"
            value={estimate.systemSizeRangeKw}
            helper="Preliminary design range"
          />

          <PrimaryMetric
            label="Annual Production"
            value={displayedAnnualProduction}
            helper="Estimated yearly output"
          />
        </section>

        {pvWattsEstimate.status === "loading" && (
          <p className="text-center text-sm text-muted-foreground">
            Refining production estimate with NREL PVWatts...
          </p>
        )}

        {pvWattsEstimate.status === "ready" && (
          <p className="text-center text-sm text-muted-foreground">
            Production estimate adjusted using NREL PVWatts for this location.
          </p>
        )}

        <section className="rounded-2xl border bg-muted/40 p-5">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-1">
              <p className="font-medium">Recommended next step</p>
              <p className="text-sm text-muted-foreground">
                Get a custom solar design to verify roof space, shade, utility
                rules, incentives, equipment options, and final savings.
              </p>
            </div>
          </div>
        </section>

        <LeadCaptureBooking lead={lead} estimate={estimate} score={score} />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger className="text-left">
              <span className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                View estimate details
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-5 pt-2">
                <div className="grid gap-3 md:grid-cols-2">
                  <SecondaryMetric label="Property" value={lead.address} />
                  <SecondaryMetric label="Electric Bill" value={billLabel} />
                  <SecondaryMetric
                    label="Utility Estimate"
                    value={formatUtilityProvider(estimate.utilityProvider)}
                  />
                  <SecondaryMetric
                    label="Assumed Rate"
                    value={formatRate(estimate.utilityRatePerKwh)}
                  />
                  <SecondaryMetric
                    label="Confidence"
                    value={confidenceLabel}
                  />
                  <SecondaryMetric
                    label="First-Year Energy Value"
                    value={formatCurrency(estimate.firstYearUtilityValue)}
                  />
                  <SecondaryMetric
                    label="10-Year Utility Value"
                    value={formatCurrency(estimate.tenYearUtilityValue)}
                  />
                  <SecondaryMetric
                    label="10-Year Solar Cost"
                    value={formatCurrency(estimate.tenYearSolarCost)}
                  />
                  <SecondaryMetric
                    label="10-Year Est. Difference"
                    value={formatCurrency(
                      estimate.tenYearEstimatedSavingsVsUtility
                    )}
                  />
                </div>

                <PvWattsValidation lead={lead} estimate={estimate} />

                <CalculationBreakdown estimate={estimate} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="text-center text-xs text-muted-foreground">
          This is not a final proposal. Final numbers require a full roof,
          utility, shading, equipment, and financing review.
        </p>
      </CardContent>
    </Card>
  );
}

function PrimaryMetric({
  label,
  value,
  helper,
  featured = false,
}: {
  label: string;
  value: string;
  helper: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "rounded-2xl border bg-foreground p-5 text-background"
          : "rounded-2xl border bg-card p-5"
      }
    >
      <p
        className={
          featured
            ? "text-sm text-background/70"
            : "text-sm text-muted-foreground"
        }
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>

      <p
        className={
          featured
            ? "mt-2 text-xs text-background/70"
            : "mt-2 text-xs text-muted-foreground"
        }
      >
        {helper}
      </p>
    </div>
  );
}

function SecondaryMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}