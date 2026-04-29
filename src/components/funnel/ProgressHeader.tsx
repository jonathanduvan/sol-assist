import { Progress } from "@/components/ui/progress";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressHeader({ currentStep, totalSteps }: Props) {
  const value = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8 space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Sol Assist</span>
        <span>
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <Progress value={value} />
    </div>
  );
}