import React from "react";
import Product from "../Product";
import Paginate from "./Paginate";

// ✅ Product Type (extend as needed)
type ProductType = {
  id: string;
  title: string;
  price?: number;
  imageUrl?: string;
};

// ✅ Props Type
type FilteredProductsProps = {
  products: ProductType[];
  productCount: number;
  isSearch?: boolean;
};

export default function FilteredProducts({
  products,
  productCount,
  isSearch,
}: FilteredProductsProps) {
  // ✅ PAGINATION
  const pageSize = 3;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div>
      {/* 🔹 Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>

      {/* 🔹 Pagination */}
      <div className="p-8 mx-auto flex items-center justify-center w-full">
        <Paginate totalPages={totalPages} isSearch={isSearch} />
      </div>
    </div>
  );
}