"use client";

import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

// ✅ Form Type
type PriceFormData = {
  min?: number;
  max?: number;
};

// ✅ Props Type
type PriceFilterProps = {
  slug: string;
  isSearch?: boolean;
};

// ✅ Price Range Type
type PriceRange = {
  display: string;
  min?: number;
  max?: number;
};

export default function PriceFilter({
  slug,
  isSearch,
}: PriceFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Safe params
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "asc";
  const page = Number(searchParams.get("page") ?? 1);

  const { handleSubmit, reset, register } = useForm<PriceFormData>();

  // ✅ Price ranges
  const priceRanges: PriceRange[] = [
    { display: "Under 300", max: 300 },
    { display: "Between 300 and 500", min: 300, max: 500 },
    { display: "Between 500 and 700", min: 500, max: 700 },
    { display: "Above 700", min: 700 },
  ];

  // ✅ Submit handler
  const onSubmit = (data: PriceFormData) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("sort", sort);

    if (data.min !== undefined) params.set("min", data.min.toString());
    if (data.max !== undefined) params.set("max", data.max.toString());

    if (isSearch && search) {
      params.set("search", search);
    }

    router.push(
      isSearch
        ? `/search?${params.toString()}`
        : `/category/${slug}?${params.toString()}`
    );

    reset();
  };

  // ✅ URL builder
  const createUrl = (range: PriceRange) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("sort", sort);

    if (range.min !== undefined) params.set("min", range.min.toString());
    if (range.max !== undefined) params.set("max", range.max.toString());

    if (isSearch && search) {
      params.set("search", search);
    }

    return `?${params.toString()}`;
  };

  // ✅ Active check
  const isActive = (range: PriceRange) => {
    return (
      (range.min?.toString() === minParam &&
        range.max?.toString() === maxParam) ||
      (range.min?.toString() === minParam && !range.max && !maxParam) ||
      (range.max?.toString() === maxParam && !range.min)
    );
  };

  return (
    <div>
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Price</h2>

        <Link
          href={
            isSearch
              ? `/search?search=${search}`
              : `/category/${slug}`
          }
          className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Reset Filters
        </Link>
      </div>

      {/* 🔹 Predefined Filters */}
      <div className="flex flex-col gap-3 mt-4">
        {priceRanges.map((range) => (
          <Link
            key={range.display}
            href={createUrl(range)}
            className={`flex gap-2 items-center ${
              isActive(range) ? "text-lime-500" : ""
            }`}
          >
            <Circle className="w-4 h-4" />
            {range.display}
          </Link>
        ))}
      </div>

      {/* 🔹 Custom Range Form */}
      {!isSearch && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4 my-4"
        >
          <input
            {...register("min")}
            type="number"
            placeholder="Min"
            className="col-span-1 input"
          />

          <input
            {...register("max")}
            type="number"
            placeholder="Max"
            className="col-span-1 input"
          />

          <button
            type="submit"
            className="col-span-1 bg-lime-700 text-white rounded-lg"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
}