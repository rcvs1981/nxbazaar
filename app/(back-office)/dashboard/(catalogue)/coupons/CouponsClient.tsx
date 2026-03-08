"use client"

import { columns } from "./columns"
import DataTable from "@/components/data-table-components/DataTable"
import { useCoupons } from "@/hooks/useCouponMutation"
import type { Coupon } from "@/types/coupon"

interface Props {
  initialData: Coupon[]
}

export default function CouponsClient({ initialData }: Props) {
  const { data: couponsResponse } = useCoupons()
  const coupons = couponsResponse?.data || initialData

  return (
    <DataTable<Coupon>
      data={coupons ?? []}
      columns={columns}
      endpoint="coupons"
      queryKey={["coupons"]}
    />
  )
}