export type QualificationMode =
  | "self"
  | "consultant";

export type CustomerType =
  | "residential"
  | "commercial";

export type BillRange =
  | "100-150"
  | "150-250"
  | "250-plus";

export type OwnershipStatus =
  | "owner"
  | "renter";

export type Timeline =
  | "asap"
  | "1-3-months"
  | "exploring";

export type LeadInput = {
  address: string;
  customerType: CustomerType;
  billRange: BillRange;
  ownership: OwnershipStatus;
  timeline: Timeline;
  mode: QualificationMode;
};