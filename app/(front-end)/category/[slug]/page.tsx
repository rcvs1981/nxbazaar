import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/products";

// ✅ Params Types
type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    sort?: string;
    min?: string;
    max?: string;
    page?: string;
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = params;

  // ✅ Default values with type safety
  const sort = searchParams?.sort ?? "asc";
  const min = Number(searchParams?.min ?? 0);
  const max = searchParams?.max ? Number(searchParams.max) : undefined;
  const page = Number(searchParams?.page ?? 1);

  // ✅ Fetch category
  const category = await getcategories(`/filter/${slug}`);

  if (!category) {
    return <div>Category not found</div>;
  }

  // ✅ Build query string safely
  const query = `?catId=${category.id}&page=${page}&sort=${sort}&min=${min}${
    max ? `&max=${max}` : ""
  }`;

  const products = await getproducts(query);

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}