import type { CommercialPropertyType } from "@/types/lead";

export function getCommercialOpportunityMessage(
  propertyType?: CommercialPropertyType
) {
  switch (propertyType) {
    case "warehouse-industrial":
      return "Warehouses and industrial properties often have large roof areas and high daytime energy usage, which can make them strong solar candidates.";

    case "retail-restaurant":
      return "Retail and restaurant properties can benefit from reducing daytime operating costs and improving long-term energy predictability.";

    case "office-medical":
      return "Office and medical properties can use solar to reduce recurring utility expenses and support long-term property value.";

    case "hotel-multifamily":
      return "Hotels and multifamily properties often have steady energy demand, making solar useful for lowering operating expenses.";

    case "other-commercial":
    default:
      return "Commercial properties can use solar to reduce operating costs, improve energy predictability, and capture available incentives.";
  }
}