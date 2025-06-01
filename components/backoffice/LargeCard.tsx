"use client";
import { Layers } from "lucide-react";
import React from "react";

type LargeCardProps = {
  data: {
    period: string;
    sales: number | string;
    color: string;
  };
  className?: string;
};

export default function LargeCard({ data }: LargeCardProps) {
  return (
     <div
      className={`rounded-lg text-white shadow-md p-8 flex items-center flex-col gap-2 ${data.color} `}
    >
      <Layers />
      <h2 className="text-lg font-semibold">{data.period}</h2>
      <h2 className="text-2xl font-bold mt-2">₹{data.sales}</h2>
    </div>
  );
}
