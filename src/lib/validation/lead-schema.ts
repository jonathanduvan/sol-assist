import { z } from "zod";

export const leadSchema = z.object({
  address: z.string().min(5),
  customerType: z.enum(["residential", "commercial"]),
  billRange: z.enum(["100-150", "150-250", "250-plus"]),
  ownership: z.enum(["owner", "renter"]),
  timeline: z.enum(["asap", "1-3-months", "exploring"]),
  mode: z.enum(["self", "consultant"]),
  score: z.number().min(0).max(100),
  solarFit: z.string(),
  estimatedSavingsMonthly: z.string(),
  systemSizeRangeKw: z.string(),
  annualProductionKwh: z.string(),
});

export type LeadPayload = z.infer<typeof leadSchema>;