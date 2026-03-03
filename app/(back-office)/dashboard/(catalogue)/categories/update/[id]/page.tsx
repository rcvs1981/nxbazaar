import { notFound } from "next/navigation";
import {db} from "@/lib/db";
import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import { Category } from "@prisma/client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateCategory({
  params,
}: PageProps) {

  const { id } = await params; // ✅ Next 16 unwrap

  const category: Category | null =
    await db.category.findUnique({
      where: { id },
    });

  if (!category) {
    notFound(); // ✅ native 404 page
  }

  // ✅ Normalize null → undefined for form
  const normalizedCategory = {
    ...category,
    imageUrl: category.imageUrl ?? undefined,
    description: category.description ?? undefined,
  };

  return (
    <>
      <FormHeader title="Update Category" />
      <NewCategoryForm updateData={normalizedCategory} />
    </>
  );
}