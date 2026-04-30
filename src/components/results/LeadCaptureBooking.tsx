"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
  score: number;
};

export function LeadCaptureBooking({ lead, estimate, score }: Props) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const bookingEmbedUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

  const [showBooking, setShowBooking] = useState(false);

  return (
    <Card className="rounded-2xl border bg-card">
      <CardContent className="space-y-5 p-5">
        {!showBooking ? (
          <>
            <div className="space-y-1">
              <p className="font-medium">Get your custom solar design</p>
              <p className="text-sm text-muted-foreground">
                Choose a time to review your property, savings estimate, and best next steps.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full rounded-xl"
              onClick={() => setShowBooking(true)}
            >
              Continue to Booking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">Choose a time</p>
                <p className="text-sm text-muted-foreground">
                  Book a free call to verify roof space, utility details, and final savings.
                </p>
              </div>
            </div>

            {bookingEmbedUrl ? (
              <iframe
                src={bookingEmbedUrl}
                className="h-[720px] w-full rounded-2xl border"
                title="Book a solar consultation"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Booking embed URL is not set.
              </p>
            )}

            {bookingUrl && (
              <Button variant="outline" className="w-full rounded-xl" asChild>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Open booking page in new tab
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}