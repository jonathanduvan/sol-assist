"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadInput } from "@/types/lead";
import type { SolarEstimate } from "@/types/solar";
import { LeadCaptureForm } from "./LeadCaptureForm";

type Props = {
  lead: LeadInput;
  estimate: SolarEstimate;
  score: number;
};

export function LeadCaptureBooking({ lead, estimate, score }: Props) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const bookingEmbedUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

  const [showBooking, setShowBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const isCommercial = lead.customerType === "commercial";

  async function handleLeadCapture(values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName?: string;
  }) {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          lead,
          estimate,
          score,
        }),
      });

      if (!response.ok) {
        console.warn("Lead save failed. Continuing to booking.");
      }
    } catch (error) {
      console.warn("Lead save error. Continuing to booking.", error);
    } finally {
      setShowBooking(true);
    }
  }

  if (bookingComplete) {
    return (
      <Card className="rounded-2xl border bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">You’re all set.</p>
              <p className="text-sm text-muted-foreground">
                Your solar snapshot has been saved. If your appointment was
                confirmed in Google Calendar, it should appear on the calendar
                shortly.
              </p>
            </div>
          </div>

          {bookingUrl && (
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Reopen booking page
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border bg-card">
      <CardContent className="space-y-5 p-5">
        {!showBooking ? (
          <LeadCaptureForm lead={lead} onSubmit={handleLeadCapture} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="font-medium">
                  {isCommercial
                    ? "Choose a time for your commercial solar review"
                    : "Choose a time"}
                </p>

                <p className="text-sm text-muted-foreground">
                  {isCommercial
                    ? "We’ll review roof potential, utility costs, available incentives, financing options, and projected ROI."
                    : "Book a free call to verify roof space, utility details, and final savings."}
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

            <Button
              className="w-full rounded-xl"
              onClick={() => setBookingComplete(true)}
            >
              I finished booking
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>

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