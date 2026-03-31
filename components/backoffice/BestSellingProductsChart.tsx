"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Product = {
  title: string;
  sales?: number;
};

type Props = {
  products?: Product[];
};

export default function BestSellingProductsChart({ products }: Props) {
  // ✅ safety (VERY IMPORTANT)
  const safeProducts = products ?? [];

  // ✅ fallback UI
  if (safeProducts.length === 0) {
    return (
      <div className="p-8 rounded-lg shadow bg-slate-50 dark:bg-slate-700">
        <p className="text-center text-gray-500">
          No product data available
        </p>
      </div>
    );
  }

  const data = {
    labels: safeProducts.map((p) => p.title),
    datasets: [
      {
        label: "Sales",
        data: safeProducts.map((p) => p.sales ?? 0),
        backgroundColor: [
          "rgba(0, 0, 255, 0.7)",
          "rgba(255, 0, 221, 0.7)",
          "rgba(2, 139, 71, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Best Selling Products
      </h2>

      <div className="p-4">
        <Pie data={data} />
      </div>
    </div>
  );
}