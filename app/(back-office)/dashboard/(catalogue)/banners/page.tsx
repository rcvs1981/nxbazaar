"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import PageHeader from "@/components/backoffice/PageHeader"
import DataTable from "@/components/data-table-components/DataTable"
import { columns } from "./columns"
import { useBanners, useMultiDeleteBanner } from "@/hooks/useBannerMutation"

export default function BannersPage() {
  const router = useRouter()
  const { data: bannersResponse, isLoading, error } = useBanners()
  const multiDeleteMutation = useMultiDeleteBanner()

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      toast.error("Please select banners to delete")
      return
    }

    try {
      const result = await multiDeleteMutation.mutateAsync(selectedRows)
      if (result.success) {
        toast.success(`${selectedRows.length} banners deleted successfully`)
        setSelectedRows([])
      } else {
        toast.error(result.error || "Failed to delete banners")
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading banners...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">Error loading banners</div>
      </div>
    )
  }

  const banners = bannersResponse?.data || []

  return (
    <div>
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkTitle="Add Banner"
      />

      {selectedRows.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedRows.length} banner{selectedRows.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={handleBulkDelete}
              disabled={multiDeleteMutation.isPending}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
            >
              {multiDeleteMutation.isPending ? "Deleting..." : "Delete Selected"}
            </button>
          </div>
        </div>
      )}

      <div className="py-8">
        <DataTable
          data={banners}
          columns={columns}
          onSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  )
}