"use client";

import { ArrowRight, BadgeCheck, Building2, Handshake, Home, SunMedium, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AddressAutocomplete,
  type SelectedAddress,
} from "@/components/address/AddressAutocomplete";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onAddressSelect: (address: SelectedAddress) => void;
  onNext: () => void;
};

export function AddressStep({
  value = "",
  onChange,
  onAddressSelect,
  onNext,
}: Props) {
  const canContinue = value.trim().length > 8;

  function handleAddressSelect(address: SelectedAddress) {
    onAddressSelect(address);
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <section className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
          <SunMedium className="h-4 w-4 text-primary" />
          Solar qualification powered by Sol Assist
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Sol Assist × Skyward Solar LLC
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              See if your property is a strong solar candidate.
            </h1>
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Sol Assist gives homeowners and businesses a fast preliminary solar
            snapshot using your address, energy cost, regional production data,
            and PVWatts validation where available.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            <a
              href="https://skywardsolar.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Skyward Solar LLC
            </a>{" "}
            is the solar installation and project development partner that helps qualified
            property owners move from preliminary analysis to system design, proposal,
            and installation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <TrustPill icon={<Zap className="h-4 w-4" />} label="Savings estimate" />
          <TrustPill icon={<Building2 className="h-4 w-4" />} label="Commercial ROI view" />
          <TrustPill icon={<BadgeCheck className="h-4 w-4" />} label="No obligation" />
        </div>

        <div className="rounded-3xl border bg-card/70 p-5 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="font-medium">Start with the property address</p>
              <p className="text-sm text-muted-foreground">
                Select an address from the list so we can analyze the right location.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <AddressAutocomplete
              value={value}
              onValueChange={onChange}
              onSelect={handleAddressSelect}
            />

            <Button
              size="lg"
              className="w-full rounded-xl"
              disabled={!canContinue}
              onClick={onNext}
            >
              Analyze Property
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <aside className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-5">
            <div>
              <p className="text-2xl font-semibold">Sol Assist</p>
            </div>

            <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              Solar Intelligence
            </div>
          </div>

          <div className="space-y-4">
            <Feature
              title="Residential solar fit"
              description="Estimate savings, system size, and solar potential for homeowners."
            />

            <Feature
              title="Commercial investment screening"
              description="Highlight annual savings, tax credit estimates, payback, and ROI potential."
            />

            <Feature
              title="Built for fast conversations"
              description="Use it live with leads or send it as a quick qualification link."
            />
          </div>

          <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Skyward Solar LLC</p>
            <p className="mt-1">
              Sol Assist is the qualification experience. Skyward Solar
              provides the review the property, design options, and next steps.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function TrustPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border bg-card/70 px-4 py-3 text-sm font-medium shadow-sm">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-background/40 p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}