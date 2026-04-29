"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CustomerType } from "@/types/lead";

type Props = {
  onSelect: (value: CustomerType) => void;
};

export function CustomerTypeStep({ onSelect }: Props) {
  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Property Type</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Is this for a home or business?
          </h1>
        </div>

        <div className="grid gap-4">
          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("residential")}
          >
            Residential home
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("commercial")}
          >
            Commercial property
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}