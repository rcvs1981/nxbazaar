import { db } from "@/lib/db";
import PageHeader from "@/components/backoffice/PageHeader";
import SubCategoriesClient from "./SubCategoriesClient";

export default async function SubCategoryPage() {
  const data = await db.subCategory.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <PageHeader
        heading="SubCategories"
        href="/dashboard/subcategories/new"
        linkTitle="Add SubCategory"
      />

      <div className="py-0">
        <SubCategoriesClient initialData={data} />
      </div>
    </div>
  );
}
