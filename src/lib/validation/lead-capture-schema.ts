import { z } from "zod";

export const leadCaptureSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  companyName: z.string().optional(),

  lead: z.object({
    address: z.string(),
    customerType: z.enum(["residential", "commercial"]),
    commercialPropertyType: z.string().optional(),
    billRange: z.enum(["100-150", "150-250", "250-plus"]),
    monthlyBillAmount: z.number().optional(),
    ownership: z.enum(["owner", "renter"]),
    timeline: z.enum(["asap", "1-3-months", "exploring"]),
    mode: z.enum(["self", "consultant"]),
  }),

  estimate: z.object({
    solarFit: z.string(),
    systemSizeRangeKw: z.string(),
    estimatedSavingsMonthly: z.string(),
    annualSavingsLabel: z.string(),
    annualProductionKwh: z.string(),
    estimatedPaybackLabel: z.string(),
    estimatedFederalTaxCreditLabel: z.string(),
    utilityProvider: z.string(),
  }),

  score: z.number(),
});

export type LeadCapturePayload = z.infer<typeof leadCaptureSchema>;