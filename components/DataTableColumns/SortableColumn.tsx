"use client";

import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props<TData> = {
  column: Column<TData, unknown>;
  title: string;
};

export default function SortableColumn<TData>({
  column,
  title,
}: Props<TData>) {
  return (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
