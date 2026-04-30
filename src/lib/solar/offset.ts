import type { BillRange, CustomerType } from "@/types/lead";

export function getTargetOffset(params: {
  customerType: CustomerType;
  billRange: BillRange;
}): number {
  if (params.customerType === "commercial") {
    return 0.85;
  }

  if (params.billRange === "250-plus") {
    return 0.9;
  }

  return 0.85;
}