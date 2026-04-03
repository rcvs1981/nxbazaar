"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

// ✅ Props Type Define
type BreadcrumbProps = {
  title: string;
  resultCount: number;
};

export default function Breadcrumb({
  title,
  resultCount,
}: BreadcrumbProps) {
  const searchParams = useSearchParams();

  // ✅ हमेशा string आता है → convert to number
  const currentPage = Number(searchParams.get("page") ?? 1);

  const pageSize = 3;

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultCount);

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center">
        <Link href="/">Home</Link>
        <ChevronRight className="w-5 h-5" />
        <p>{title}</p>
      </div>

      <p>
        {startRange}-{endRange} of {resultCount} results
      </p>
    </div>
  );
}