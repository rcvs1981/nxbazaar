import SubCategoryForm from "@/components/backoffice/Forms/SubCategoryForm"
import { getCategories } from "@/actions/category"
import { getHsnCodes } from "@/actions/hsnCode" 

export default async function NewSubCategoryPage() {
  const categories = await getCategories()
  const hsnCodes = await getHsnCodes() 

  return (
    <SubCategoryForm
      categories={categories}
      hsnCodes={hsnCodes} 
    />
  )
}