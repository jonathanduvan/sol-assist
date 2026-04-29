"use client";

import type { LeadInput } from "@/types/lead";
import { AddressStep } from "@/components/steps/AddressStep";
import { CustomerTypeStep } from "@/components/steps/CustomerTypeStep";
import { BillStep } from "@/components/steps/BillStep";
import { OwnershipStep } from "@/components/steps/OwnershipStep";
import { TimelineStep } from "@/components/steps/TimelineStep";

export type FunnelStep =
  | "address"
  | "customerType"
  | "bill"
  | "ownership"
  | "timeline";

type Props = {
  step: FunnelStep;
  lead: Partial<LeadInput>;
  onUpdate: (values: Partial<LeadInput>) => void;
  onNext: () => void;
};

export function StepRenderer({ step, lead, onUpdate, onNext }: Props) {
  switch (step) {
    case "address":
      return (
       <AddressStep
        value={lead.address}
        onChange={(address) => onUpdate({ address })}
        onAddressSelect={(selectedAddress) =>
          onUpdate({
            address: selectedAddress.formattedAddress,
            selectedAddress,
          })
        }
        onNext={onNext}
      />
      );

    case "customerType":
      return (
        <CustomerTypeStep
          onSelect={(customerType) => {
            onUpdate({ customerType });
            onNext();
          }}
        />
      );

    case "bill":
      return (
        <BillStep
          customerType={lead.customerType}
          onSelect={(billRange, monthlyBillAmount) => {
            onUpdate({ billRange, monthlyBillAmount });
            onNext();
          }}
        />
      );

    case "ownership":
      return (
        <OwnershipStep
          customerType={lead.customerType}
          onSelect={(ownership) => {
            onUpdate({ ownership });
            onNext();
          }}
        />
      );

    case "timeline":
      return (
        <TimelineStep
          onSelect={(timeline) => {
            onUpdate({ timeline });
            onNext();
          }}
        />
      );
  }
}