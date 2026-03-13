import PageHeader from "@/components/backoffice/PageHeader"
import DataTable from "@/components/data-table-components/DataTable"
import { columns } from "./columns"
import { getBanners } from "@/actions/banner"

export default async function Page() {

  const bannersResponse = await getBanners()

  if (!bannersResponse.success) {
    return (
      <div className="p-6 text-red-500">
        {bannersResponse.error || "Failed to load banners"}
      </div>
    )
  }

  const banners = bannersResponse.data ?? []

  return (
    <div>

      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkTitle="Add Banner"
      />

      <div className="py-8">
        <DataTable
          data={banners}
          columns={columns}
        />
      </div>

    </div>
  )
}