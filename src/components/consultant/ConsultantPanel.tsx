import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import {
  classifyLead,
  getQualificationFlags,
  getRecommendedAction,
} from "@/lib/scoring/lead-score";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  lead: Partial<LeadInput>;
  score: number | null;
  estimate: SolarEstimate | null;
};

export function ConsultantPanel({ lead, score, estimate }: Props) {
  const hasCompleteData = score !== null && estimate !== null;

  const fullLead = lead as LeadInput;

  const category = hasCompleteData ? classifyLead(score) : "Incomplete";
  const action = hasCompleteData
    ? getRecommendedAction(score, fullLead)
    : "Complete the funnel to generate a recommendation.";

  const flags = hasCompleteData
    ? getQualificationFlags(fullLead, estimate)
    : [];

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
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Recommended Action</p>
          <p className="text-sm text-muted-foreground">{action}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Flags</p>
          <div className="flex flex-wrap gap-2">
            {flags.length > 0 ? (
              flags.map((flag) => (
                <Badge key={flag} variant="secondary">
                  {flag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Complete more fields to generate flags.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Address: {lead.address ?? "—"}</p>
          <p>Type: {lead.customerType ?? "—"}</p>
          <p>Bill: {lead.billRange ?? "—"}</p>
          <p>Ownership: {lead.ownership ?? "—"}</p>
          <p>Timeline: {lead.timeline ?? "—"}</p>
        </div>

        <Textarea placeholder="Call notes..." className="min-h-28 rounded-xl" />
      </CardContent>
    </Card>
  );
}