import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getProduct } from "@/actions/products";
import { getCategories } from "@/actions/category";
import { getSubCategories } from "@/actions/subcategory";
import React from "react";
import { Product, Category } from "@prisma/client";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UpdateProduct({ params }: Params) {
  const { id } = await params; // ✅ FIX

  const product: Product = await getProduct(id);
  const categories: Category[] = await getCategories();
const subCategories = await getSubCategories();
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <FormHeader title="Update Product" />

      <NewProductForm
        updateData={product}
        categories={categories}
        subCategories={subCategories}
      />
    </div>
  );
}