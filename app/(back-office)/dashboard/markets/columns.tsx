// app/dashboard/markets/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Market } from "@/types/market";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";


interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}


export const columns: ColumnDef<Market>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v: boolean) =>
          table.toggleAllPageRowsSelected(v)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v: boolean) =>
          row.toggleSelected(v)
        }
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Title" />
    ),
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => (
      <ImageColumn<Market> row={row} accessorKey="logoUrl" />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DateColumn<Market> row={row} accessorKey="createdAt" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const market = row.original;

      return (
        <ActionColumn<Market>
          row={row}
          title="Market"
          editEndpoint={`markets/update/${market.id}`}
          endpoint={`markets/${market.id}`}
        />
      );
    },
  },
];


 