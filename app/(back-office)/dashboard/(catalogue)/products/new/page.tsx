import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getCategories } from "@/actions/category";
import { getHsnCodes } from "@/actions/hsnCode";

/* ================= TYPES ================= */

type SelectOption = {
  id: string;
  title: string;
};

/* ================= PAGE ================= */

export default async function NewProduct() {

  const categoriesData = await getCategories();
  const hsnCodesData = await getHsnCodes();

  const categories: SelectOption[] = categoriesData.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }));

  const hsnCodes: SelectOption[] = hsnCodesData.map((h) => ({
    id: h.id,
    title: h.code,
  }));

  return (
    <div>

      <FormHeader title="New Product" />

      <NewProductForm
        categories={categories}
        hsnCodes={hsnCodes} // ✅ FIX
      />

    </div>
  );
}