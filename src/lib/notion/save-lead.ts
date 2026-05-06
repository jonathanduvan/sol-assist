import { Client } from "@notionhq/client";
import type { LeadCapturePayload } from "@/lib/validation/lead-capture-schema";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

function optionalText(value?: string) {
  return value?.trim() || "";
}

export async function saveLeadToNotion(payload: LeadCapturePayload) {
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Missing NOTION_LEADS_DATABASE_ID");
  }

  const fullName = `${payload.firstName} ${payload.lastName ?? ""}`.trim();

  return notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: fullName || "New Sol Assist Lead",
            },
          },
        ],
      },

      Company: {
        rich_text: [
          {
            text: {
              content: optionalText(payload.companyName),
            },
          },
        ],
      },

      Email: {
        email: payload.email,
      },

      Phone: {
        phone_number: optionalText(payload.phone) || null,
      },

      Address: {
        rich_text: [
          {
            text: {
              content: payload.lead.address,
            },
          },
        ],
      },

      "Customer Type": {
        select: {
          name: payload.lead.customerType,
        },
      },

      "Property Type": {
        select: {
          name: payload.lead.commercialPropertyType ?? "N/A",
        },
      },

      "Monthly Bill": {
        number: payload.lead.monthlyBillAmount ?? null,
      },

      "Bill Range": {
        select: {
          name: payload.lead.billRange,
        },
      },

      Ownership: {
        select: {
          name: payload.lead.ownership,
        },
      },

      Timeline: {
        select: {
          name: payload.lead.timeline,
        },
      },

      "Solar Fit": {
        select: {
          name: payload.estimate.solarFit,
        },
      },

      "Lead Score": {
        number: payload.score,
      },

      "Estimated Savings": {
        rich_text: [
          {
            text: {
              content: payload.estimate.estimatedSavingsMonthly,
            },
          },
        ],
      },

      "Annual Savings": {
        rich_text: [
          {
            text: {
              content: payload.estimate.annualSavingsLabel,
            },
          },
        ],
      },

      "System Size": {
        rich_text: [
          {
            text: {
              content: payload.estimate.systemSizeRangeKw,
            },
          },
        ],
      },

      "Annual Production": {
        rich_text: [
          {
            text: {
              content: payload.estimate.annualProductionKwh,
            },
          },
        ],
      },

      "Payback Period": {
        rich_text: [
          {
            text: {
              content: payload.estimate.estimatedPaybackLabel,
            },
          },
        ],
      },

      "Federal Tax Credit": {
        rich_text: [
          {
            text: {
              content: payload.estimate.estimatedFederalTaxCreditLabel,
            },
          },
        ],
      },

      "Utility Provider": {
        rich_text: [
          {
            text: {
              content: payload.estimate.utilityProvider,
            },
          },
        ],
      },

      Status: {
        status: {
          name: "New",
        },
      },

      "Created At": {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });
}