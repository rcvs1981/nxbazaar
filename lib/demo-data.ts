import { Sale, Order, Product } from "@/types/dashboard";

// SALES
export const demoSales: Sale[] = [
  { id: "s1", total: 120, createdAt: "2025-02-10" },
  { id: "s2", total: 340, createdAt: "2025-02-11" },
  { id: "s3", total: 220, createdAt: "2025-02-12" },
  { id: "s4", total: 540, createdAt: "2025-02-13" },
];

// ORDERS  ⭐ FIXED
export const demoOrders: Order[] = [
  {
    id: "o1",
    total: 120,
    orderStatus: "PENDING",
    createdAt: "2025-02-10",
  },
  {
    id: "o2",
    total: 300,
    orderStatus: "PROCESSING",
    createdAt: "2025-02-11",
  },
  {
    id: "o3",
    total: 500,
    orderStatus: "DELIVERED",
    createdAt: "2025-02-12",
  },
  {
    id: "o4",
    total: 200,
    orderStatus: "SHIPPED",
    createdAt: "2025-02-13",
  },
];

// PRODUCTS
export const demoProducts: Product[] = [
  { id: "p1", title: "Tomato", productPrice: 40, createdAt: "2025-02-10" },
  { id: "p2", title: "Potato", productPrice: 30, createdAt: "2025-02-11" },
  { id: "p3", title: "Onion", productPrice: 50, createdAt: "2025-02-12" },
];
