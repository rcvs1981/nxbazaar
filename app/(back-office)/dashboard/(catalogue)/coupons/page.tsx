import PageHeader from "@/components/backoffice/PageHeader"
import { getCoupons } from "@/actions/coupon"
import CouponsClient from "./CouponsClient"
import type { Coupon } from "@/types/coupon"

export default async function CouponsPage() {
  const response = await getCoupons()
  const coupons: Coupon[] = response.data || []

  return (
    <div>
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />

      <div className="py-0">
        <CouponsClient initialData={coupons} />
      </div>
    </div>
  )
}