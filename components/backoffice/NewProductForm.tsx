"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";

import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { generateBarcode } from "@/lib/generateBarcode";

import { createProduct, updateProduct } from "@/actions/products";

type ProductFormValues = {
  title: string;
  sku: string;
  barcode?: string;
  productPrice: number;
  salePrice: number;
  gstRate: number;
  productStock: number;
  unit: string;
  categoryId: string;
  description?: string;
  wholesalePrice?: number;
  wholesaleQty?: number;
  isWholesale: boolean;
  isActive: boolean;
};

type Props = {
  categories: { id: string; title: string }[];
  updateData?: Partial<ProductFormValues> & {
    id?: string;
    tags?: string[];
    productImages?: string[];
  };
};

export default function NewProductForm({
  categories,
  updateData = {},
}: Props) {
  const router = useRouter();

  const id = updateData?.id ?? "";
  const initialTags = updateData?.tags ?? [];
  const initialImages = updateData?.productImages ?? [];

  const [tags, setTags] = useState<string[]>(initialTags);
  const [productImages, setProductImages] = useState<string[]>(initialImages);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  const isWholesale = watch("isWholesale");

  const mutation = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      if (id) {
        return updateProduct(id, data);
      }
      return createProduct(data);
    },
    onSuccess: () => {
      router.push("/dashboard/products");
      router.refresh();
      reset();
      setTags([]);
      setProductImages([]);
    },
  });

  async function onSubmit(data: ProductFormValues) {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("PRD", data.title);

    const barcode = data.barcode || generateBarcode();

    const payload = {
      ...data,
      barcode,
      slug,
      productCode,
      tags,
      productImages,
      qty: 1,
    };

    mutation.mutate(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
  className="w-full max-w-5xl p-6 bg-gradient-to-r from-orange-50 to-orange-100 
dark:from-orange-900 dark:to-orange-800 
rounded-lg shadow ">
     <div className="grid gap-4  sm:gap-6">

        <TextInput
          label="Product Title"
          name="title"
          register={register}
          errors={errors}
        />
 <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="SKU"
          name="sku"
          register={register}
          errors={errors}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6"
        />

        <TextInput
          label="Barcode"
          name="barcode"
          register={register}
          errors={errors}
        />
        </div>
         <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
        <TextInput
          label="Product Price"
          name="productPrice"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Sale Price"
          name="salePrice"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="GST Rate (%)"
          name="gstRate"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Product Stock"
          name="productStock"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Unit (Kg, Gram etc)"
          name="unit"
          register={register}
          errors={errors}
        />
</div>
<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <SelectInput
          label="Category"
          name="categoryId"
          register={register}
          errors={errors}
          options={categories}
        />
</div>
<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ToggleInput
          label="Supports Wholesale"
          name="isWholesale"
          trueTitle="Yes"
          falseTitle="No"
          register={register}
        />

        {isWholesale && (
          <>
            <TextInput
              label="Wholesale Price"
              name="wholesalePrice"
              type="number"
              register={register}
              errors={errors}
            />

            <TextInput
              label="Minimum Wholesale Qty"
              name="wholesaleQty"
              type="number"
              register={register}
              errors={errors}
            />
          </>
        )}
</div>
        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Images"
        />

       

        <TextareaInput
          label="Product Description"
          name="description"
          register={register}
          errors={errors}
        />
         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
         <ArrayItemsInput
          items={tags}
          setItems={setTags}
          itemTitle="Tag"
        />
        <ToggleInput
          label="Publish Product"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        </div>
      </div>

      <SubmitButton
        isLoading={mutation.isPending}
        buttonTitle={id ? "Update Product" : "Create Product"}
        loadingButtonTitle={
          id ? "Updating Product..." : "Creating Product..."
        }
      />
    </form>
  );
}