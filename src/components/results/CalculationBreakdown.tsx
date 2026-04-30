import type { SolarEstimate } from "@/types/solar";

type Props = {
  estimate: SolarEstimate;
};

export function CalculationBreakdown({ estimate }: Props) {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <div className="space-y-2">
        <p>
          This is a preliminary estimate based on the property address, your
          electric bill, typical solar production in your region, and assumed
          local utility rates.
        </p>

        <p>
          We first estimate how much electricity your bill represents, then size
          a system intended to offset at least 85% of that usage. From there, we
          estimate annual production and convert that energy into potential
          monthly savings.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl border bg-muted/40 p-4 sm:grid-cols-2">
        <Detail label="Production factor" value={`${estimate.regionFactorKwhPerKw} kWh/kW/year`} />
        <Detail label="Assumed utility rate" value={`${Math.round(estimate.utilityRatePerKwh * 100)}¢/kWh`} />
        <Detail label="Utility increase" value={`${Math.round(estimate.utilityEscalationRate * 100)}%/year`} />
        <Detail label="Solar rate assumption" value={`${Math.round(estimate.solarRatePerKwh * 1000) / 10}¢/kWh`} />
        <Detail label="Solar rate increase" value={`${Math.round(estimate.solarEscalationRate * 1000) / 10}%/year`} />
        <Detail label="Confidence" value={estimate.confidence} />
      </div>

      <p>
        Final savings depend on roof layout, shading, utility rules, equipment,
        system design, financing terms, solar rate, and contract structure.
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}