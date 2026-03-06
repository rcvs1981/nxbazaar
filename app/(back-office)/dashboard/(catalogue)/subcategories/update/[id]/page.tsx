import {db} from "@/lib/db"
import SubCategoryForm from "@/components/backoffice/Forms/NewSubCategoryForm"

interface Props {
  params: { id: string }
}

export default async function UpdateSubCategoryPage({ params }: Props) {
  const subcategory = await db.subCategory.findUnique({
    where: { id: params.id },
  })

  if (!subcategory) return null

  return (
    <SubCategoryForm
      initialData={subcategory}
      id={subcategory.id}
    />
  )
}