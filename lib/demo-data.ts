import { Sale, Order, Product } from "@/types/dashboard";
import { Category } from "@/types/category";
import { SubCategory } from "@/types/subcategory";

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

// CATEGORIES
export const demoCategories: Category[] = [
  {
    id: "c1",
    title: "Vegetables",
    slug: "vegetables",
    imageUrl: "/categories/vegetables.jpg",
    description: "Fresh vegetables",
    isActive: true,
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "c2",
    title: "Fruits",
    slug: "fruits",
    imageUrl: "/categories/fruits.jpg",
    description: "Fresh fruits",
    isActive: true,
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
];

// SUBCATEGORIES
export const demoSubCategories: SubCategory[] = [
  {
    id: "sc1",
    title: "Leafy Vegetables",
    slug: "leafy-vegetables",
    imageUrl: "/subcategories/leafy.jpg",
    description: "Green leafy vegetables",
    isActive: true,
    categoryId: "c1",
    createdAt: "2025-02-10",
  },
  {
    id: "sc2",
    title: "Root Vegetables",
    slug: "root-vegetables",
    imageUrl: "/subcategories/root.jpg",
    description: "Underground vegetables",
    isActive: true,
    categoryId: "c1",
    createdAt: "2025-02-10",
  },
];

// MARKETS
export const demoMarkets: any[] = [
  {
    id: "m1",
    title: "Central Market",
    slug: "central-market",
    imageUrl: "/markets/central.jpg",
    description: "Main central market",
    isActive: true,
    createdAt: "2025-02-10",
  },
  {
    id: "m2",
    title: "Farmers Market",
    slug: "farmers-market",
    imageUrl: "/markets/farmers.jpg",
    description: "Direct from farmers",
    isActive: true,
    createdAt: "2025-02-10",
  },
];
