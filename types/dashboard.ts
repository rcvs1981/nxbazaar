export type Sale = {
  id: string;
  total: number;
  createdAt: string;
};

export type Order = {
  id: string;
  total: number;
  orderStatus:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELED";
  createdAt: string;
};

export type Product = {
  id: string;
  title: string;
  productPrice: number;
  createdAt: string;
};
