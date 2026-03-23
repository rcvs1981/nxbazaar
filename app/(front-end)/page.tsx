import CategoryList from "@/components/frontend/CategoryList";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";

import { getCategories } from "@/actions/category";
import { auth } from "@/auth";

interface Product {
  id: string;
}

interface Category {
  id: string;
  title: string;
  products: Product[];
}

export default async function Home(): Promise<JSX.Element> {

  const [categoriesData, session] = await Promise.all([
    getCategories(),
    auth(),
  ]);

  const categories = categoriesData.filter((category: Category) => {
    return category.products.length > 3;
  });

  console.log(session?.user);

  return (
    <div className="min-h-screen">
      <Hero />

      <MarketList />

      {categories.map((category) => (
        <div className="py-8" key={category.id}>
          <CategoryList
            isMarketPage={false}
            category={category}
          />
        </div>
      ))}
    </div>
  );
}