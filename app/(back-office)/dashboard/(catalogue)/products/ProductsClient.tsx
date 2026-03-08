'use client';

import { useState } from 'react';
import { useProducts, useMultiDeleteProduct } from '@/hooks/useProductMutation';
import { Product } from '@/types/product';
import { columns } from './columns';
import DataTable from '@/components/data-table-components/DataTable';
import toast from 'react-hot-toast';

interface ProductsClientProps {
  initialData: Product[];
}

export default function ProductsClient({ initialData }: ProductsClientProps) {
  const { data: products = initialData, isLoading } = useProducts();
  const deleteMultipleMutation = useMultiDeleteProduct();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error('No products selected');
      return;
    }

    const confirmed = confirm(`Delete ${selectedIds.length} product(s)?`);
    if (!confirmed) return;

    try {
      const result = await deleteMultipleMutation.mutateAsync(selectedIds);
      if (result.success) {
        toast.success('Products deleted successfully');
        setSelectedIds([]);
      } else {
        toast.error(result.error || 'Failed to delete products');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <span className="text-sm text-red-800">
            {selectedIds.length} product(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleteMultipleMutation.isPending}
            className="ml-auto px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMultipleMutation.isPending ? 'Deleting...' : 'Delete Selected'}
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        onRowSelectionChange={(selectedRows) => {
          const ids = selectedRows.map((row: Product) => row.id);
          setSelectedIds(ids);
        }}
      />
    </div>
  );
}
