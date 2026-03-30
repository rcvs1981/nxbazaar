import { getCategories } from "@/actions/category";
import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { Category } from "@prisma/client";

export default async function NewMarket() {
  const categoriesData: Category[] = await getCategories();

  const categories = categoriesData.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  return <NewMarketForm categories={categories} />;
}