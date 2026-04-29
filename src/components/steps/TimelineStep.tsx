"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Timeline } from "@/types/lead";

type Props = {
  onSelect: (value: Timeline) => void;
};

export function TimelineStep({ onSelect }: Props) {
  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Timeline</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            When are you looking to go solar?
          </h1>
        </div>

        <div className="grid gap-4">
          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("asap")}
          >
            ASAP
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("1-3-months")}
          >
            1–3 months
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="justify-start rounded-xl"
            onClick={() => onSelect("exploring")}
          >
            Just exploring
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}