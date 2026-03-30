import { getCategories } from "@/actions/category";
import { getMarketById } from "@/actions/market"; // ✅ ADD THIS
import NewMarketForm from "@/components/backoffice/NewMarketForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditMarketPage({ params }: Props) {
  const { id } = await params; // ✅ FIX

  const market = await getMarketById(id);
  const categoriesData = await getCategories();

  if (!market) {
    return <p>Market not found</p>;
  }

  const marketWithCategoryIds = {
    ...market,
    categoryIds: market.categories?.map((c) => c.id) || [],
  };

  const categories = categoriesData.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  return (
    <NewMarketForm
      market={marketWithCategoryIds}
      categories={categories}
    />
  );
}