import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getProduct, getCategories } from "@/lib/getData";
import React from "react";
import { Product, Category } from "@prisma/client";

type Params = {
  params: {
    id: string;
  };
};

export default async function UpdateProduct({ params }: Params) {
  const { id } = params;

  const product: Product = await getProduct(id);
  const categories: Category[] = await getCategories();

  return (
    <div>
      <FormHeader title="Update Product" />

      <NewProductForm
        updateData={product}
        categories={categories}
      />
    </div>
  );
}