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
  selectedAddress?: SelectedPropertyAddress;
  customerType: CustomerType;
  billRange: BillRange;
  monthlyBillAmount?: number;
  ownership: OwnershipStatus;
  timeline: Timeline;
  mode: QualificationMode;
};

export type SelectedPropertyAddress = {
  formattedAddress: string;
  placeId: string;
  latitude: number | null;
  longitude: number | null;
};