import PageHeader from "@/components/backoffice/PageHeader"
import DataTable from "@/components/data-table-components/DataTable"
import { columns } from "./columns"
import { getCategories } from "@/actions/category"
import { Category } from "@/types/category"
import CategoriesClient from "./CategoriesClient"

export default async function Page() {
  const categories: Category[] =
    await getCategories()

  return (
    <div>
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

      <div className="py-0">
        <CategoriesClient
          initialData={categories}
        />
      </div>
    </div>
  )
}