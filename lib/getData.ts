import { demoOrders, demoProducts, demoSales } from "./demo-data";
import { Order, Product, Sale } from "@/types/dashboard";

type DataType = "sales" | "orders" | "products";

type ReturnMap = {
  sales: Sale[];
  orders: Order[];
  products: Product[];
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

  throw new Error("Invalid data type");
}
