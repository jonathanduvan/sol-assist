"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { BillRange, CustomerType } from "@/types/lead";

type Props = {
  customerType?: CustomerType;
  onSelect: (value: BillRange, monthlyBillAmount?: number) => void;
};

function inferBillRange(amount: number): BillRange {
  if (amount >= 250) return "250-plus";
  if (amount >= 150) return "150-250";
  return "100-150";
}

export function BillStep({ customerType = "residential", onSelect }: Props) {
  const [monthlyBill, setMonthlyBill] = useState("");

  const billAmount = Number(monthlyBill);
  const canUseExactAmount = Number.isFinite(billAmount) && billAmount > 0;

  const label =
    customerType === "commercial"
      ? "What is the property's average monthly electric cost?"
      : "What is your average monthly electric bill?";

  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Energy Usage</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {label}
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter an exact amount for a better estimate, or choose a quick range.
          </p>
        </div>

        <div className="space-y-3">
          <Input
            inputMode="decimal"
            value={monthlyBill}
            onChange={(event) => {
              const nextValue = event.target.value.replace(/[^\d.]/g, "");
              setMonthlyBill(nextValue);
            }}
            placeholder="Example: 225"
            className="h-12 rounded-xl"
          />

          <Button
            size="lg"
            className="w-full rounded-xl"
            disabled={!canUseExactAmount}
            onClick={() => {
              onSelect(inferBillRange(billAmount), billAmount);
            }}
          >
            Use ${monthlyBill || "exact bill"}
          </Button>
        </div>

        <div className="relative py-2 text-center text-sm text-muted-foreground">
          or choose a range
        </div>

        <div className="grid gap-4">
          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("100-150")}
          >
            $100–$150
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("150-250")}
          >
            $150–$250
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("250-plus")}
          >
            $250+
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}