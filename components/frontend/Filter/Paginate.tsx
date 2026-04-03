"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

// ✅ Props Type
type PaginateProps = {
  totalPages: number;
  isSearch?: boolean;
};

export default function Paginate({
  totalPages,
  isSearch,
}: PaginateProps) {
  const searchParams = useSearchParams();

  // ✅ Safe params
  const sort = searchParams.get("sort") ?? "asc";
  const min = searchParams.get("min") ?? "0";
  const max = searchParams.get("max") ?? "";
  const search = searchParams.get("search") ?? "";

  const currentPage = Number(searchParams.get("page") ?? 1);

  // ✅ Reusable function to generate URL
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("sort", sort);
    params.set("min", min);
    if (max) params.set("max", max);

    if (isSearch && search) {
      params.set("search", search);
    }

    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* 🔹 Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(
              currentPage === 1 ? 1 : currentPage - 1
            )}
          />
        </PaginationItem>

        {/* 🔹 Pages */}
        {totalPages <= 3 ? (
          Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  href={createPageUrl(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  href={createPageUrl(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* 🔹 Next */}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(
              currentPage === totalPages
                ? totalPages
                : currentPage + 1
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}