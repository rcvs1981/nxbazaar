"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export default function VendorProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role !== "vendor") return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?vendorId=${session.user.id}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [session]);

  if (!session || session.user?.role !== "vendor") {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return <div>लोडिंग...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">मेरे उत्पाद</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">नया उत्पाद जोड़ें</Link>
        </Button>
      </div>
      
      {products.length === 0 ? (
        <p>आपके कोई उत्पाद नहीं हैं</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold mt-2">₹{product.price}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/products/${product.id}`}>एडिट करें</Link>
                </Button>
                <Button variant="destructive" size="sm">
                  डिलीट करें
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}