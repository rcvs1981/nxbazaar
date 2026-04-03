"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

// ✅ Props Type
type SortingProps = {
  title: string;
  slug: string;
  isSearch?: boolean;
};

// ✅ Sorting Link Type
type SortingLink = {
  title: string;
  sort: "asc" | "desc" | null;
  href: string;
};

export default function Sorting({
  title,
  slug,
  isSearch,
}: SortingProps) {
  const searchParams = useSearchParams();

  // ✅ Safe params
  const sortParam = searchParams.get("sort");
  const min = searchParams.get("min") ?? "0";
  const max = searchParams.get("max") ?? "";
  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  // ✅ URL builder (DRY)
  const createUrl = (sort: "asc" | "desc" | null) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (sort) params.set("sort", sort);
    if (min) params.set("min", min);
    if (max) params.set("max", max);

    if (isSearch && search) {
      params.set("search", search);
      return `/search?${params.toString()}`;
    }

    return `/category/${slug}?${params.toString()}`;
  };

  // ✅ Sorting options
  const sortingLinks: SortingLink[] = [
    {
      title: "Relevance",
      sort: null,
      href: isSearch
        ? `/search?search=${search}`
        : `/category/${slug}`,
    },
    {
      title: "Price - High to Low",
      sort: "desc",
      href: createUrl("desc"),
    },
    {
      title: "Price - Low to High",
      sort: "asc",
      href: createUrl("asc"),
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* 🔹 Title */}
      <h2 className="text-2xl font-medium">
        {isSearch && "Search Results - "}
        {title}
      </h2>

      {/* 🔹 Sorting */}
      <div className="flex text-sm items-center gap-3">
        <p>Sort by:</p>

        <div className="flex items-center gap-2">
          {sortingLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`px-2 py-1 border ${
                link.sort === sortParam
                  ? "bg-slate-800 border-lime-400 text-lime-400"
                  : "border-slate-500"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}