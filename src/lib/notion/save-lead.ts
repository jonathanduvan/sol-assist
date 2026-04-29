import { Client } from "@notionhq/client";
import type { LeadPayload } from "@/lib/validation/lead-schema";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function saveLeadToNotion(lead: LeadPayload) {
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Missing NOTION_LEADS_DATABASE_ID");
  }

  return notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: lead.address,
            },
          },
        ],
      },
      Address: {
        rich_text: [
          {
            text: {
              content: lead.address,
            },
          },
        ],
      },
      "Customer Type": {
        select: {
          name: lead.customerType,
        },
      },
      "Electric Bill": {
        select: {
          name: lead.billRange,
        },
      },
      Ownership: {
        select: {
          name: lead.ownership,
        },
      },
      Timeline: {
        select: {
          name: lead.timeline,
        },
      },
      Mode: {
        select: {
          name: lead.mode,
        },
      },
      "Lead Score": {
        number: lead.score,
      },
      "Solar Fit": {
        select: {
          name: lead.solarFit,
        },
      },
      "Estimated Savings": {
        rich_text: [
          {
            text: {
              content: lead.estimatedSavingsMonthly,
            },
          },
        ],
      },
      "System Size": {
        rich_text: [
          {
            text: {
              content: lead.systemSizeRangeKw,
            },
          },
        ],
      },
      "Annual Production": {
        rich_text: [
          {
            text: {
              content: lead.annualProductionKwh,
            },
          },
        ],
      },
      Status: {
        select: {
          name: "new",
        },
      },
    },
  });
}