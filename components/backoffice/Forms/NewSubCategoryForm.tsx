"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { subCategorySchema, SubCategoryInput } from "@/lib/validators/subcategory.schema"
import { useCreateSubCategory, useUpdateSubCategory } from "@/hooks/useSubCategoryMutation"
import { useRouter } from "next/navigation"
import { SubCategory } from "@prisma/client"

interface Props {
  initialData?: SubCategory
  id?: string
}

export default function SubCategoryForm({ initialData, id }: Props) {
  const router = useRouter()

 const form = useForm<SubCategoryInput>({
  resolver: zodResolver(subCategorySchema),
  defaultValues: initialData
    ? {
        title: initialData.title,
        slug: initialData.slug,
        imageUrl: initialData.imageUrl ?? "",
        description: initialData.description ?? "",
        isActive: initialData.isActive,
        categoryId: initialData.categoryId,
      }
    : {
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        isActive: true,
        categoryId: "",
      },
})

  const createMutation = useCreateSubCategory()
  const updateMutation = useUpdateSubCategory()

  const onSubmit = async (data: SubCategoryInput) => {
    let res

    if (id) {
      res = await updateMutation.mutateAsync({ id, data })
    } else {
      res = await createMutation.mutateAsync(data)
    }

    if (res.success) {
      router.push("/dashboard/subcategories")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input {...form.register("title")} placeholder="Title" />
      <input {...form.register("slug")} placeholder="Slug" />
      <input {...form.register("imageUrl")} placeholder="Image URL" />
      <textarea {...form.register("description")} placeholder="Description" />
      <input type="checkbox" {...form.register("isActive")} />
      <input {...form.register("categoryId")} placeholder="Category ID" />

      <button type="submit">
        {id ? "Update" : "Create"}
      </button>
    </form>
  )
}