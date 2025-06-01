import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/product-card";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function MarketplacePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">मार्केटप्लेस</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard">डैशबोर्ड</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}