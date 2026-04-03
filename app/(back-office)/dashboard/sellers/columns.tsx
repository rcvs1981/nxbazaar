"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import Status from "@/components/DataTableColumns/Status";

// ✅ Define Seller Type
export type Seller = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: boolean;
  createdAt: string | Date;
};

// ✅ Typed Columns
export const columns: ColumnDef<Seller>[] = [
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
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumn column={column} title="Name" />
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "plan",
    header: "Plan",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Status row={row} accessorKey="status" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <DateColumn row={row} accessorKey="createdAt" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const seller = row.original;

      return (
        <ActionColumn
          row={row}
          title="Seller"
          editEndpoint={`/sellers/update/${seller.id}`}
          endpoint={`/sellers/${seller.id}`}
        />
      );
    },
  },
];