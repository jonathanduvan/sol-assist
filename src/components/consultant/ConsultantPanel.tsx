// src/components/consultant/ConsultantPanel.tsx

import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  lead: Partial<LeadInput>;
  score: number | null;
  estimate: SolarEstimate | null;
};

export function ConsultantPanel({ lead, score, estimate }: Props) {
  return (
    <Card className="h-fit rounded-2xl">
      <CardContent className="space-y-5 p-5">
        <div>
          <p className="text-sm text-muted-foreground">Consultant Mode</p>
          <h2 className="text-xl font-semibold">Lead Snapshot</h2>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Lead Score</p>
          <p className="text-3xl font-bold">{score ?? "--"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {lead.billRange && <Badge variant="secondary">Bill: {lead.billRange}</Badge>}
          {lead.ownership && <Badge variant="secondary">{lead.ownership}</Badge>}
          {lead.timeline && <Badge variant="secondary">{lead.timeline}</Badge>}
          {estimate && <Badge>{estimate.solarFit} fit</Badge>}
        </div>

        <Textarea placeholder="Call notes..." className="min-h-28 rounded-xl" />
      </CardContent>
    </Card>
  );
}