"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import ImageInput from "@/components/FormInputs/ImageInput"
import SubmitButton from "@/components/FormInputs/SubmitButton"
import TextInput from "@/components/FormInputs/TextInput"
import ToggleInput from "@/components/FormInputs/ToggleInput"

import { bannerSchema, BannerInput } from "@/lib/validators/banner.schema"
import { useCreateBanner, useUpdateBanner } from "@/hooks/useBannerMutation"

interface BannerFormProps {
  updateData?: Partial<BannerInput & { id: string }>
}

export default function BannerForm({ updateData }: BannerFormProps) {
  const router = useRouter()

  const createMutation = useCreateBanner()
  const updateMutation = useUpdateBanner()

  const [imageUrl, setImageUrl] = useState(updateData?.imageUrl || "")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BannerInput>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: updateData?.title || "",
      link: updateData?.link || "",
      imageUrl: updateData?.imageUrl || "",
      isActive: updateData?.isActive ?? true,
    },
  })

  const onSubmit = async (data: BannerInput) => {
    setLoading(true)

    try {
      const bannerData = { ...data, imageUrl }

      if (updateData?.id) {
        const result = await updateMutation.mutateAsync({
          id: updateData.id,
          ...bannerData,
        })

        if (result.success) {
          toast.success("Banner updated successfully")
          router.push("/dashboard/banners")
        } else {
          toast.error(result.error || "Failed to update banner")
        }
      } else {
        const result = await createMutation.mutateAsync(bannerData)

        if (result.success) {
          toast.success("Banner created successfully")
          reset()
          setImageUrl("")
        } else {
          toast.error(result.error || "Failed to create banner")
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
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
          className="w-full"
        />

        <div className="sm:col-span-2">
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="bannerImageUploader"
            label="Banner Image"
          />
        </div>

        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={updateData?.id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          updateData?.id ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  )
}