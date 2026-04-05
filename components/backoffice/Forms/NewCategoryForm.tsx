"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ImageInput from "@/components/FormInputs/ImageInput"
import SubmitButton from "@/components/FormInputs/SubmitButton"
import TextareaInput from "@/components/FormInputs/TextAreaInput"
import TextInput from "@/components/FormInputs/TextInput"
import ToggleInput from "@/components/FormInputs/ToggleInput"

import {
  useCreateCategory,
  useUpdateCategory
} from "@/hooks/useCategoryMutation"

import {
  Category,
  CategoryFormData
} from "@/types/category"



interface Props {
  updateData?: Category
}

export default function NewCategoryForm({
  updateData
}: Props) {

  const router = useRouter()
  const id = updateData?.id

  const [imageUrl, setImageUrl] = useState<string>(
    updateData?.imageUrl ?? ""
  )

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm<CategoryFormData>({
  defaultValues: {
    title: updateData?.title ?? "",
    description: updateData?.description ?? "",
    imageUrl: updateData?.imageUrl ?? "",
    isActive: updateData?.isActive ?? true
  }
})

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()

 async function onSubmit(data: CategoryFormData) {
  const formattedData: CategoryFormData = {
    ...data,
    imageUrl,
  }

  let res

  if (id) {
    // 🔥 UPDATE
    res = await updateMutation.mutateAsync({
      id,
      data: formattedData,
    })
  } else {
    // 🔥 CREATE
    res = await createMutation.mutateAsync(formattedData)
  }

  // ✅ Handle Response Properly
  if (res.success) {
    toast.success(res.message)

    if (!id) {
      reset()
      setImageUrl("")
    }

    router.push("/dashboard/categories")
  } else {
    toast.error(res.message)
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
     className="max-w-4xl mx-auto p-6 rounded-lg 
bg-orange-500 dark:bg-orange-500 
border border-orange-300 dark:border-orange-900 
text-foreground"
    >
      <div className="grid gap-4 sm:grid-cols-2">

        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          label="Category Image"
        />

        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

      </div>

      <SubmitButton
        isLoading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        buttonTitle={
          id ? "Update Category" : "Create Category"
        }
        loadingButtonTitle={
          id
            ? "Updating Category..."
            : "Creating Category..."
        }
      />
    </form>
  )
}