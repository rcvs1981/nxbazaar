"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import toast from "react-hot-toast"

import TextInput from "@/components/FormInputs/TextInput"
import ToggleInput from "@/components/FormInputs/ToggleInput"
import SubmitButton from "@/components/FormInputs/SubmitButton"

import { couponSchema } from "@/lib/validators/coupon.schema"
import { useCreateCoupon, useUpdateCoupon } from "@/hooks/useCouponMutation"
import type { CreateCouponInput, UpdateCouponInput } from "@/types/coupon"

interface CouponFormProps {
  updateData?: UpdateCouponInput
}

export default function CouponForm({ updateData }: CouponFormProps) {
  const router = useRouter()
  const vendorId = ""

  const createMutation = useCreateCoupon()
  const updateMutation = useUpdateCoupon()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCouponInput>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      title: updateData?.title || "",
      expiryDate: updateData?.expiryDate 
        ? typeof updateData.expiryDate === 'string' 
          ? updateData.expiryDate.split('T')[0]
          : new Date(updateData.expiryDate).toISOString().split('T')[0]
        : "",
      isActive: updateData?.isActive ?? true,
      vendorId: updateData?.vendorId || vendorId,
    },
  })

  const onSubmit = async (data: CreateCouponInput) => {
    setLoading(true)

    try {
      if (updateData?.id) {
        const result = await updateMutation.mutateAsync({
          id: updateData.id,
          ...data,
          vendorId: vendorId || data.vendorId,
        })

        if (result.success) {
          toast.success("Coupon updated successfully")
          router.push("/dashboard/coupons")
        } else {
          toast.error(result.error || "Failed to update coupon")
        }
      } else {
        const result = await createMutation.mutateAsync({
          ...data,
          vendorId: vendorId || data.vendorId,
        })

        if (result.success) {
          toast.success("Coupon created successfully")
          reset()
        } else {
          toast.error(result.error || "Failed to create coupon")
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />

        <ToggleInput
          label="Publish your Coupon"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={updateData?.id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          updateData?.id ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  )
}