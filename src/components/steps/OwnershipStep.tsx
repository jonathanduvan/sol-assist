"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CustomerType, OwnershipStatus } from "@/types/lead";

type Props = {
  customerType?: CustomerType;
  onSelect: (value: OwnershipStatus) => void;
};

export function OwnershipStep({ customerType = "residential", onSelect }: Props) {
  const question =
    customerType === "commercial"
      ? "Do you own or control the property?"
      : "Do you own the home?";

  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Property Control</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{question}</h1>
        </div>

        <div className="grid gap-4">
          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("owner")}
          >
            Yes
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("renter")}
          >
            No
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}