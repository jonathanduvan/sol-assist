"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Building2, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LeadInput } from "@/types/lead";

type Props = {
  lead: LeadInput;
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName?: string;
  }) => Promise<void> | void;
};

export function LeadCaptureForm({ lead, onSubmit }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCommercial = lead.customerType === "commercial";

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length >= 2 &&
      email.trim().length >= 5
    );
  }, [email, firstName]);

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        companyName: companyName.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="font-medium">
          {isCommercial
            ? "Send me my commercial solar snapshot"
            : "Send me my solar snapshot"}
        </p>

        <p className="text-sm text-muted-foreground">
          {isCommercial
            ? "Get your preliminary savings, payback, and solar investment summary."
            : "Get your preliminary savings estimate and solar qualification summary."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          className="h-11 rounded-xl"
        />

        <Input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last name"
          className="h-11 rounded-xl"
        />
      </div>

      {isCommercial && (
        <Input
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Company name"
          className="h-11 rounded-xl"
        />
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          type="email"
          className="h-11 rounded-xl"
        />

        <Input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
          type="tel"
          className="h-11 rounded-xl"
        />
      </div>

      <Button
        size="lg"
        className="w-full rounded-xl"
        disabled={!canSubmit || isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Saving..." : "Continue to Booking"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}