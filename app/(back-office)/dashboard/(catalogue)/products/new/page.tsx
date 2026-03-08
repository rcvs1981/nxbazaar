import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getCategories } from "@/actions/category";
import React from "react";

type Category = {
  id: string;
  title: string;
};

export default async function NewProduct() {
  const categoriesData = await getCategories();

  if (!categoriesData) {
    return <div>Loading...</div>;
  }

  const categories: Category[] = (categoriesData as Category[]).map(
    (category) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="New Product" />

      <NewProductForm categories={categories} />
    </div>
  );
}