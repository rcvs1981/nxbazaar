"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Product } from "@/types/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  products: Product[];
}

export default function BestSellingProductsChart({ products }: Props) {
  const data = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        // demo sales distribution
        data: products.map(() => Math.floor(Math.random() * 50 + 10)),
        backgroundColor: ["#22c55e", "#3b82f6", "#f97316", "#a855f7"],
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
      <Pie data={data} />
    </div>
  );
}
