import {db} from "@/lib/db"
import { getCategories } from "@/actions/category"
import SubCategoryForm from "@/components/backoffice/Forms/SubCategoryForm"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function UpdateSubCategoryPage({ params }: Props) {
  const { id } = await params

  const [subcategory, categories] = await Promise.all([
    db.subCategory.findUnique({
      where: { id },
    }),
    getCategories(),
  ])

  if (!subcategory) {
    notFound()
  }

  return (
    <SubCategoryForm
      updateData={subcategory}
      categories={categories}
    />
  )
}
