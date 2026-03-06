"use client"

import { columns } from "./columns"
import DataTable from "@/components/data-table-components/DataTable"
import { useSubCategories } from "@/hooks/useSubCategoryMutation"

interface Props {
  initialData: any[]
}

export default function SubCategoriesClient({
  initialData
}: Props) {
  const { data } = useSubCategories(initialData)

  return (
    <DataTable<any>
      data={data ?? []}
      columns={columns}
      endpoint="subcategories"
      queryKey={["subcategories"]}
    />
  )
}
