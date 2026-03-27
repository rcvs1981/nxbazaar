// types/market.ts
export interface Market {
  id: string;
  title: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  categories: { id: string; name: string }[];
}