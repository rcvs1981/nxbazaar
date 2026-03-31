"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";

import { Sale } from "@/types/sale";

export const columns: ColumnDef<Sale>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "productImage",
    header: "Product Image",
    cell: ({ row }) => (
      <ImageColumn row={row} accessorKey="productImage" />
    ),
  },

  {
    accessorKey: "productTitle",
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Title" />
    ),
  },

  {
    accessorKey: "productPrice",
    header: "Price",
  },

  {
    accessorKey: "productQty",
    header: "Qty",
  },

  {
    accessorKey: "total",
    header: "Total",
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <DateColumn row={row} accessorKey="createdAt" />
    ),
  },
];