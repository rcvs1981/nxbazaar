import {db} from "@/lib/db"
import {columns} from "./columns"
import DataTable from "@/components/data-table-components/DataTable"
interface Props {
  searchParams: {
    page?: string
    limit?: string
    sort?: string
    order?: "asc" | "desc"
  }
}

export default async function SubCategoryPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const skip = (page - 1) * limit

  const sortField = searchParams.sort || "createdAt"
  const sortOrder = searchParams.order || "desc"

  const [data, total] = await Promise.all([
    db.subCategory.findMany({
      skip,
      take: limit,
      orderBy: { [sortField]: sortOrder },
      include: { category: true },
    }),
    db.subCategory.count(),
  ])

  return (
    <DataTable
      columns={columns}
      
      total={total}
      page={page}
      limit={limit}
    />
  )
}