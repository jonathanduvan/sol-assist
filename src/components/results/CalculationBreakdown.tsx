import type { SolarEstimate } from "@/types/solar";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  estimate: SolarEstimate;
};

export function CalculationBreakdown({ estimate }: Props) {
  return (
    <Card className="rounded-2xl bg-muted/50">
      <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          How this estimate was calculated
        </p>

        <p>
          We estimate system size from your electric bill, then estimate annual
          production using a regional solar production factor.
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          <p>
            Production factor:{" "}
            <span className="font-medium text-foreground">
              {estimate.regionFactorKwhPerKw} kWh/kW/year
            </span>
          </p>

          <p>
            Assumed utility rate:{" "}
            <span className="font-medium text-foreground">
              {Math.round(estimate.utilityRatePerKwh * 100)}¢/kWh
            </span>
          </p>

          <p>
            Utility increase:{" "}
            <span className="font-medium text-foreground">
              {Math.round(estimate.utilityEscalationRate * 100)}%/year
            </span>
          </p>

          <p>
            Confidence:{" "}
            <span className="font-medium text-foreground">
              {estimate.confidence}
            </span>
          </p>

          <p>
            Estimate type:{" "}
            <span className="font-medium text-foreground">
              Preliminary
            </span>
          </p>
        </div>
        <p>
          The 10-year value estimate applies an assumed annual utility increase to the
          value of energy the system is expected to produce.
        </p>
        <p>
          Final savings depend on roof layout, shading, utility rules, equipment,
          system design, and financing terms.
        </p>
      </CardContent>
    </Card>
  );
}