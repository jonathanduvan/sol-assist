"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui/input";

export type SelectedAddress = {
  formattedAddress: string;
  placeId: string;
  latitude: number | null;
  longitude: number | null;
  stateCode?: string;
  city?: string;
  postalCode?: string;
};

type AddressPrediction = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
  placePrediction: google.maps.places.PlacePrediction;
};

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  onSelect: (address: SelectedAddress) => void;
};

let googleMapsOptionsSet = false;
let placesLibraryPromise: Promise<google.maps.PlacesLibrary> | null = null;

function getAddressComponent(
  components: google.maps.places.AddressComponent[] | undefined,
  type: string
) {
  return components?.find((component) => component.types.includes(type));
}

function parseAddressComponents(
  components: google.maps.places.AddressComponent[] | undefined
) {
  const state = getAddressComponent(components, "administrative_area_level_1");

  const city =
    getAddressComponent(components, "locality") ??
    getAddressComponent(components, "postal_town") ??
    getAddressComponent(components, "administrative_area_level_3");

  const postalCode = getAddressComponent(components, "postal_code");

  return {
    stateCode: state?.shortText ?? undefined,
    city: city?.longText ?? undefined,
    postalCode: postalCode?.longText ?? undefined,
  };
}

async function loadPlacesLibrary() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }

  if (!googleMapsOptionsSet) {
    setOptions({
      key: apiKey,
      v: "weekly",
    });

    googleMapsOptionsSet = true;
  }

  placesLibraryPromise ??= importLibrary(
    "places"
  ) as Promise<google.maps.PlacesLibrary>;

  return placesLibraryPromise;
}

export function AddressAutocomplete({
  value,
  onValueChange,
  onSelect,
}: Props) {
  const [predictions, setPredictions] = useState<AddressPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken | null>(null);

  const requestIdRef = useRef(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const normalizedValue = useMemo(() => value.trim(), [value]);

  const canSearch =
    normalizedValue.length >= 3 &&
    normalizedValue !== selectedValue;

  useEffect(() => {
    let isActive = true;

    async function fetchPredictions() {
      if (!canSearch) {
        setPredictions([]);
        setIsDropdownOpen(false);
        return;
      }

      setIsLoading(true);
      const requestId = ++requestIdRef.current;

      try {
        const places = await loadPlacesLibrary();

        const token = sessionToken ?? new places.AutocompleteSessionToken();

        if (!sessionToken) {
          setSessionToken(token);
        }

        const response =
          await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: normalizedValue,
            sessionToken: token,
            includedRegionCodes: ["us"],
            includedPrimaryTypes: ["street_address", "premise"],
          });

        if (!isActive || requestId !== requestIdRef.current) return;

        const nextPredictions = response.suggestions
          .map((suggestion) => suggestion.placePrediction)
          .filter((placePrediction): placePrediction is google.maps.places.PlacePrediction =>
            Boolean(placePrediction)
          )
          .map((placePrediction) => {
            const mainText =
              placePrediction.mainText?.toString() ??
              placePrediction.text?.toString() ??
              "";

            const secondaryText =
              placePrediction.secondaryText?.toString() ?? "";

            return {
              placeId: placePrediction.placeId,
              mainText,
              secondaryText,
              fullText: placePrediction.text?.toString() ?? mainText,
              placePrediction,
            };
          });

        setPredictions(nextPredictions);
        setIsDropdownOpen(nextPredictions.length > 0);
      } catch (error) {
        console.error("Failed to fetch address predictions", error);
        setPredictions([]);
        setIsDropdownOpen(false);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    const timeoutId = window.setTimeout(fetchPredictions, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [canSearch, normalizedValue, sessionToken]);

  async function handleSelect(prediction: AddressPrediction) {
    setIsLoading(true);
    setIsDropdownOpen(false);
    setPredictions([]);

    requestIdRef.current += 1;

    try {
      const place = prediction.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["formattedAddress", "location", "id", "addressComponents"],
      });

      const formattedAddress = place.formattedAddress || prediction.fullText;

      setSelectedValue(formattedAddress);

      const parsedAddress = parseAddressComponents(place.addressComponents);

      const selectedAddress: SelectedAddress = {
        formattedAddress,
        placeId: place.id ?? prediction.placeId,
        latitude: place.location?.lat() ?? null,
        longitude: place.location?.lng() ?? null,
        ...parsedAddress,
      };

      onValueChange(formattedAddress);
      onSelect(selectedAddress);
      setSessionToken(null);
    } catch (error) {
      console.error("Failed to select address", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(nextValue: string) {
    setSelectedValue(null);
    onValueChange(nextValue);
    setIsDropdownOpen(nextValue.trim().length >= 3);
  }

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={() => {
          if (
            predictions.length > 0 &&
            normalizedValue !== selectedValue
          ) {
            setIsDropdownOpen(true);
          }
        }}
        placeholder="123 Main St, City, State"
        autoComplete="off"
        className="h-12 rounded-xl"
      />

      {isDropdownOpen && predictions.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-background shadow-lg">
          {predictions.map((prediction) => (
            <button
              key={prediction.placeId}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-muted"
              onMouseDown={(event) => {
                event.preventDefault();
                void handleSelect(prediction);
              }}
            >
              <div className="font-medium">{prediction.mainText}</div>

              {prediction.secondaryText && (
                <div className="text-sm text-muted-foreground">
                  {prediction.secondaryText}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <p className="mt-2 text-sm text-muted-foreground">
          Searching addresses...
        </p>
      )}
    </div>
  );
}