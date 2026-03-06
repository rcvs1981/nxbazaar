"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ImageInput from "@/components/FormInputs/ImageInput"
import SelectInput from "@/components/FormInputs/SelectInput"
import SubmitButton from "@/components/FormInputs/SubmitButton"
import TextareaInput from "@/components/FormInputs/TextAreaInput"
import TextInput from "@/components/FormInputs/TextInput"
import ToggleInput from "@/components/FormInputs/ToggleInput"

import {
  useCreateSubCategory,
  useUpdateSubCategory,
} from "@/hooks/useSubCategoryMutation"

import { Category } from "@/types/category"
import { SubCategory } from "@prisma/client"
import {
  subCategorySchema,
  SubCategoryInput,
} from "@/lib/validators/subcategory.schema"

interface Props {
  categories: Category[]
  updateData?: SubCategory
}

type ActionResult = {
  success?: boolean
  message?: string
  error?: unknown
}

function extractMessage(error: unknown): string | null {
  if (!error) return null

  if (typeof error === "string") {
    return error
  }

  if (typeof error === "object") {
    const record = error as Record<string, unknown>

    for (const value of Object.values(record)) {
      if (typeof value === "string") {
        return value
      }

      if (Array.isArray(value)) {
        const firstText = value.find(
          (item) => typeof item === "string"
        )
        if (typeof firstText === "string") {
          return firstText
        }
      }

      if (value && typeof value === "object") {
        const nested = extractMessage(value)
        if (nested) {
          return nested
        }
      }
    }
  }

  return null
}

export default function SubCategoryForm({
  categories,
  updateData,
}: Props) {
  const router = useRouter()
  const id = updateData?.id

  const [imageUrl, setImageUrl] = useState<string>(
    updateData?.imageUrl ?? ""
  )

  const categoryOptions = [
    { label: "Select Category", value: "" },
    ...categories.map((category) => ({
      label: category.title,
      value: category.id,
    })),
  ]

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SubCategoryInput>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      title: updateData?.title ?? "",
     
      description: updateData?.description ?? "",
      imageUrl: updateData?.imageUrl ?? "",
      isActive: updateData?.isActive ?? true,
      categoryId: updateData?.categoryId ?? "",
    },
  })

  const createMutation = useCreateSubCategory()
  const updateMutation = useUpdateSubCategory()

  useEffect(() => {
    setValue("imageUrl", imageUrl, {
      shouldValidate: true,
    })
  }, [imageUrl, setValue])

  async function onSubmit(data: SubCategoryInput) {
    const formattedData: SubCategoryInput = {
      ...data,
      imageUrl,
    }

    const result = (id
      ? await updateMutation.mutateAsync({
          id,
          data: formattedData,
        })
      : await createMutation.mutateAsync(
          formattedData
        )) as ActionResult

    if (result.success) {
      toast.success(
        result.message ??
          (id
            ? "Subcategory updated successfully"
            : "Subcategory created successfully")
      )

      if (!id) {
        reset()
        setImageUrl("")
      }

      router.push("/dashboard/subcategories")
      return
    }

    toast.error(
      extractMessage(result.error) ??
        result.message ??
        "Failed to save subcategory"
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 border rounded-lg shadow mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Subcategory Title"
          name="title"
          register={register}
          errors={errors}
        />

       

        <TextareaInput
          label="Subcategory Description"
          name="description"
          register={register}
          errors={errors}
        />

        <div>
          <SelectInput<SubCategoryInput>
            label="Parent Category"
            name="categoryId"
            register={register}
            options={categoryOptions}
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.categoryId.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUploader"
            label="Subcategory Image"
          />

          <input
            type="hidden"
            {...register("imageUrl")}
          />

          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.imageUrl.message ?? "")}
            </p>
          )}
        </div>

        <ToggleInput
          label="Publish your Subcategory"
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
          id
            ? "Update Subcategory"
            : "Create Subcategory"
        }
        loadingButtonTitle={
          id
            ? "Updating Subcategory..."
            : "Creating Subcategory..."
        }
      />
    </form>
  )
}
