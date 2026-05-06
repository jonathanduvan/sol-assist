"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CommercialPropertyType } from "@/types/lead";

type Props = {
  onSelect: (value: CommercialPropertyType) => void;
};

const options: { label: string; value: CommercialPropertyType }[] = [
  { label: "Warehouse / Industrial", value: "warehouse-industrial" },
  { label: "Retail / Restaurant", value: "retail-restaurant" },
  { label: "Office / Medical", value: "office-medical" },
  { label: "Hotel / Multifamily", value: "hotel-multifamily" },
  { label: "Other Commercial", value: "other-commercial" },
];

export function CommercialPropertyTypeStep({ onSelect }: Props) {
  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Property Type</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            What type of commercial property is this?
          </h1>
          <p className="mt-3 text-muted-foreground">
            This helps us frame the solar opportunity around how the property uses energy.
          </p>
        </div>

        <div className="grid gap-4">
          {options.map((option) => (
            <Button
              key={option.value}
              size="lg"
              variant="outline"
              className="justify-start rounded-xl"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}