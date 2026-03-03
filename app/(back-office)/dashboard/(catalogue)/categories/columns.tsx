"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@/types/category"
import { Checkbox } from "@/components/ui/checkbox"
import DateColumn from "@/components/DataTableColumns/DateColumn"
import ImageColumn from "@/components/DataTableColumns/ImageColumn"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"

export const columns: ColumnDef<Category>[] = [
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
    enableHiding: false
  },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Title" />
    )
  },

  {
    accessorKey: "imageUrl",
    header: "Category Image",
    cell: ({ row }) => (
      <ImageColumn<Category>
        row={row}
        accessorKey="imageUrl"
      />
    )
  },

  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) =>
      row.original.isActive ? "Active" : "Draft"
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <DateColumn<Category>
        row={row}
        accessorKey="createdAt"
      />
    )
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        title="Category"
        editEndpoint={`categories/update/${row.original.id}`}
        endpoint={`categories/${row.original.id}`}
      />
    )
  }
]