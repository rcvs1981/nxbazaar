import SubCategoryForm from "@/components/backoffice/Forms/SubCategoryForm"
import { getCategories } from "@/actions/category"

export default async function NewSubCategoryPage() {
  const categories = await getCategories()

  return <SubCategoryForm categories={categories} />
}
