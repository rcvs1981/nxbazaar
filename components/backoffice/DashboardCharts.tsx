"use client";

import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductsChart from "./BestSellingProductsChart";
import { Sale, Product } from "@/types/dashboard";

interface Props {
  sales: Sale[];
  products: Product[];
}

export default function DashboardCharts({ sales, products }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeeklySalesChart sales={sales} />
      <BestSellingProductsChart products={products} />
    </div>
  );
}
