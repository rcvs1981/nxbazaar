"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Sale } from "@/types/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  sales: Sale[];
}

export default function WeeklySalesChart({ sales }: Props) {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // weekly totals
  const weeklyTotals = Array(7).fill(0);

  sales.forEach((sale) => {
    const day = new Date(sale.createdAt).getDay();
    weeklyTotals[day] += sale.total;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Weekly Sales",
        data: weeklyTotals,
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.4)",
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Weekly Sales</h2>
      <Line data={data} />
    </div>
  );
}
