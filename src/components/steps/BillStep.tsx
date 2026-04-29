"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BillRange, CustomerType } from "@/types/lead";

type Props = {
  customerType?: CustomerType;
  onSelect: (value: BillRange) => void;
};

export function BillStep({ customerType = "residential", onSelect }: Props) {
  const label =
    customerType === "commercial"
      ? "What is the property's average monthly electric cost?"
      : "What is your average monthly electric bill?";

  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Energy Usage</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{label}</h1>
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