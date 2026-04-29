// src/components/results/ResultMetricCard.tsx

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  label: string;
  value: string;
};

export function ResultMetricCard({ label, value }: Props) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}