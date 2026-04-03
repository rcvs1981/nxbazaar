export interface SellerProfile {
  name: string;
  email: string;
  phone: string;
  physicalAddress: string;
  contactPerson: string;
  contactPersonPhone: string;
  turnover: number;
  mainProduct: string;
  products: string[];
  profileImageUrl?: string;
  terms?: string;
  notes?: string;
  isActive: boolean;
}

export interface SellerWithUser {
  id: string;
  sellerProfile: SellerProfile | null;
}