import { demoOrders, demoProducts, demoSales, demoCategories, demoSubCategories, demoMarkets } from "./demo-data";
import { Order, Product, Sale } from "@/types/dashboard";
import { Category } from "@/types/category";
import { SubCategory } from "@/types/subcategory";

type DataType = "sales" | "orders" | "products" | "categories" | "subcategories" | "markets";

type ReturnMap = {
  sales: Sale[];
  orders: Order[];
  products: Product[];
  categories: Category[];
  subcategories: SubCategory[];
  markets: any[];
};

export async function getData(type: DataType): Promise<ReturnMap[DataType]> {
  if (type === "sales") {
    return demoSales;
  }

  if (type === "orders") {
    return demoOrders;
  }

  if (type === "products") {
    return demoProducts;
  }

  if (type === "categories") {
    return demoCategories;
  }

  if (type === "subcategories") {
    return demoSubCategories;
  }

  if (type === "markets") {
    return demoMarkets;
  }

  throw new Error("Invalid data type");
}
