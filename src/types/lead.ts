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

export type CommercialPropertyType =
  | "warehouse-industrial"
  | "retail-restaurant"
  | "office-medical"
  | "hotel-multifamily"
  | "other-commercial";

export type LeadInput = {
  address: string;
  selectedAddress?: SelectedPropertyAddress;
  customerType: CustomerType;
  billRange: BillRange;
  monthlyBillAmount?: number;
  ownership: OwnershipStatus;
  timeline: Timeline;
  mode: QualificationMode;
  commercialPropertyType?: CommercialPropertyType;
};

export type SelectedPropertyAddress = {
  formattedAddress: string;
  placeId: string;
  firstName?: string;
  lastName?: string;

  email?: string;
  phone?: string;

  companyName?: string;
  latitude: number | null;
  longitude: number | null;
  stateCode?: string;
  city?: string;
  postalCode?: string;
};