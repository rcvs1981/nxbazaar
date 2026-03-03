"use client"

import { Category } from "@/types/category"
import { columns } from "./columns"
import DataTable from "@/components/data-table-components/DataTable"
import { useCategories } from "@/hooks/useCategoryMutation" // ✅ FIXED

interface Props {
  initialData: Category[]
}

export default function CategoriesClient({
  initialData
}: Props) {
  const { data } = useCategories(initialData)

  return (
    <DataTable<Category>
      data={data ?? []}
      columns={columns}
    />
  )
}