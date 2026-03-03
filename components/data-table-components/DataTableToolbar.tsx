"use client";

import { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useApiBulkDelete } from "@/lib/apiRequest";

interface DataTableToolbarProps<
  TData extends { id: string }
> {
  table: Table<TData>;
  endpoint: string;
  queryKey: readonly unknown[];
  filterKeys?: (keyof TData)[];
}

export function DataTableToolbar<
  TData extends { id: string }
>({
  table,
  endpoint,
  queryKey,
}: DataTableToolbarProps<TData>) {
  const bulkDelete = useApiBulkDelete(endpoint, queryKey);

  const selectedRows =
    table.getFilteredSelectedRowModel().rows;

  const ids = useMemo(
    () => selectedRows.map((row) => row.original.id),
    [selectedRows]
  );

  const handleBulkDelete = async () => {
    if (ids.length === 0) {
      toast.error("Please select at least one row");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${ids.length} selected item(s)?`
    );

    if (!confirmed) return;

    try {
      table.resetRowSelection();
      await bulkDelete.mutateAsync(ids);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Bulk delete failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {ids.length > 0 && (
          <span>{ids.length} selected</span>
        )}
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleBulkDelete}
        disabled={
          ids.length === 0 || bulkDelete.isPending
        }
      >
        {bulkDelete.isPending
          ? "Deleting..."
          : "Delete Selected"}
      </Button>
    </div>
  );
}