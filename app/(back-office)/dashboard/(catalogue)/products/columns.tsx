'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import Status from '@/components/DataTableColumns/Status';
import ActionColumn from '@/components/DataTableColumns/ActionColumn';
import { Product } from '@/types/product';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    size: 50,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableColumn column={column} title="Product Title" />,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => <SortableColumn column={column} title="SKU" />,
    cell: ({ row }) => row.getValue('sku') || '-',
  },
  {
    accessorKey: 'productPrice',
    header: ({ column }) => <SortableColumn column={column} title="Price" />,
    cell: ({ row }) => `₹${(row.getValue('productPrice') as number)?.toFixed(2)}`,
  },
  {
    accessorKey: 'salePrice',
    header: ({ column }) => <SortableColumn column={column} title="Sale Price" />,
    cell: ({ row }) => `₹${(row.getValue('salePrice') as number)?.toFixed(2)}`,
  },
  {
    accessorKey: 'productStock',
    header: ({ column }) => <SortableColumn column={column} title="Stock" />,
    cell: ({ row }) => row.getValue('productStock') || '0',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return <Status status={isActive ? 'active' : 'inactive'} />;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        title="Product"
        endpoint={`products/${row.original.id}`}
        editEndpoint={`products/update/${row.original.id}`}
      />
    ),
    enableSorting: false,
    size: 100,
  },
];
