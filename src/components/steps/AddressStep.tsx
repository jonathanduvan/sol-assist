"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AddressAutocomplete,
  type SelectedAddress,
} from "@/components/address/AddressAutocomplete";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onNext: () => void;
};

export function AddressStep({ value = "", onChange, onNext }: Props) {
  const [addressValue, setAddressValue] = useState(value);
  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddress | null>(null);

  const canContinue =
    selectedAddress !== null &&
    selectedAddress.formattedAddress === addressValue &&
    addressValue.trim().length > 8;

  function handleValueChange(nextValue: string) {
    setAddressValue(nextValue);
    setSelectedAddress(null);
    onChange(nextValue);
  }

  function handleSelect(address: SelectedAddress) {
    setSelectedAddress(address);
    setAddressValue(address.formattedAddress);
    onChange(address.formattedAddress);
  }

  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl">
      <CardContent className="space-y-6 p-8">
        <div>
          <p className="text-sm text-muted-foreground">Property Address</p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Enter your property address
          </h1>

          <p className="mt-3 text-muted-foreground">
            Select an address from the list so we can analyze the correct property.
          </p>
        </div>

        <AddressAutocomplete
          value={addressValue}
          onValueChange={handleValueChange}
          onSelect={handleSelect}
        />

        {selectedAddress && (
          <p className="text-sm text-muted-foreground">
            Selected: {selectedAddress.formattedAddress}
          </p>
        )}

        <Button
          size="lg"
          className="w-full rounded-xl"
          disabled={!canContinue}
          onClick={onNext}
        >
          Analyze Property
        </Button>
      </CardContent>
    </Card>
  );
}