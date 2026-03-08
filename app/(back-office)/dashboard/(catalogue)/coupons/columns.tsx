"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import DateColumn from "@/components/DataTableColumns/DateColumn"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"
import type { Coupon } from "@/types/coupon"

export const columns: ColumnDef<Coupon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Title" />
    ),
  },
  {
    accessorKey: "couponCode",
    header: "Code",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <DateColumn row={row} accessorKey="expiryDate" />,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        row.getValue("isActive")
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
      }`}>
        {row.getValue("isActive") ? "Active" : "Draft"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <ActionColumn
          row={row}
          title="Coupon"
          editEndpoint={`coupons/update/${coupon.id}`}
          endpoint={`coupons/${coupon.id}`}
        />
      );
    },
  },
];