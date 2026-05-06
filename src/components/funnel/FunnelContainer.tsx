"use client";

import { useMemo, useState } from "react";
import type { LeadInput, QualificationMode } from "@/types/lead";
import { estimateSolar } from "@/lib/solar/solar-engine";
import { calculateLeadScore } from "@/lib/scoring/lead-score";
import { ResultsScreen } from "@/components/results/ResultsScreen";
import { ProgressHeader } from "@/components/funnel/ProgressHeader";
import { StepRenderer, type FunnelStep } from "@/components/funnel/StepRenderer";
import { Button } from "@/components/ui/button";
import { ConsultantPanel } from "@/components/consultant/ConsultantPanel";

type Props = {
  mode?: QualificationMode;
};

const baseSteps: FunnelStep[] = ["address", "customerType"];

function getSteps(customerType?: LeadInput["customerType"]): FunnelStep[] {
  if (customerType === "commercial") {
    return [
      ...baseSteps,
      "commercialPropertyType",
      "bill",
      "ownership",
      "timeline",
    ];
  }

  return [...baseSteps, "bill", "ownership", "timeline"];
}

export function FunnelContainer({ mode = "self" }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [lead, setLead] = useState<Partial<LeadInput>>({
    mode,
  });

  const steps = useMemo(() => getSteps(lead.customerType), [lead.customerType]);

  const isComplete = stepIndex >= steps.length;
  const currentStep = steps[stepIndex];

  function updateLead(values: Partial<LeadInput>) {
    setLead((previous) => ({
      ...previous,
      ...values,
    }));
  }

  function nextStep() {
    setStepIndex((previous) => previous + 1);
  }

  function previousStep() {
    setStepIndex((previous) => Math.max(previous - 1, 0));
  }

  const completeLead = lead as LeadInput;

  const estimate = useMemo(() => {
    if (!isComplete) return null;
    return estimateSolar(completeLead);
  }, [isComplete, completeLead]);

  const score = useMemo(() => {
    if (!isComplete) return null;
    return calculateLeadScore(completeLead);
  }, [isComplete, completeLead]);

  return (
    <main className="min-h-screen px-6 py-10">
      <div
        className={
          mode === "consultant"
            ? "mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_320px]"
            : "mx-auto max-w-3xl"
        }
      >
        <section>
          {!isComplete && (
            <ProgressHeader
              currentStep={stepIndex + 1}
              totalSteps={steps.length}
            />
          )}

          {!isComplete ? (
            <>
              <StepRenderer
                step={currentStep}
                lead={lead}
                onUpdate={updateLead}
                onNext={nextStep}
              />

              {stepIndex > 0 && (
                <div className="mx-auto mt-4 max-w-xl">
                  <Button variant="ghost" onClick={previousStep}>
                    Back
                  </Button>
                </div>
              )}
            </>
          ) : (
            estimate &&
            score !== null && (
              <ResultsScreen lead={completeLead} estimate={estimate} score={score} />
            )
          )}
        </section>

        {mode === "consultant" && (
          <aside>
            <ConsultantPanel lead={lead} score={score} estimate={estimate} />
          </aside>
        )}
      </div>
    </main>
  );
}