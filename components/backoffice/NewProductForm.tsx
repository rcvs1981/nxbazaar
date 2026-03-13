"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { productSchema, ProductInput } from "@/lib/validators/productSchema.ts";
import { generateSlug } from "@/lib/generateSlug";
import { generateBarcode } from "@/lib/generateBarcode";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { SelectOption } from "@/types/product";

type Props = {
  categories: SelectOption[];
  sellers: SelectOption[];
  updateData?: Partial<ProductInput> & { id?: string };
};

export default function NewProductForm({
  categories,
  sellers,
  updateData = {},
}: Props) {

  const router = useRouter();

  const [tags, setTags] = useState<string[]>(updateData.tags ?? []);
  const [productImages, setProductImages] = useState<string[]>(
    updateData.productImages ?? []
  );

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  const isWholesale = watch("isWholesale");

  function onSubmit(data: ProductInput) {

    const payload: ProductInput = {
      ...data,
      slug: generateSlug(data.title),
      barcode: data.barcode ?? generateBarcode(),
      tags,
      productImages,
    };

    if (updateData?.id) {

      updateProduct.mutate(
        { ...payload, id: updateData.id },
        {
          onSuccess: () => router.push("/dashboard/products"),
        }
      );

    } else {

      createProduct.mutate(payload, {
        onSuccess: () => router.push("/dashboard/products"),
      });

    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6  rounded-lg shadow"
    >

      <div className="grid grid-cols-2 gap-4">

        <TextInput
          label="Product Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextInput
          label="SKU"
          name="sku"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Barcode"
          name="barcode"
          register={register}
          errors={errors}
        />

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
          label="Stock"
          name="productStock"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Unit"
          name="unit"
          register={register}
          errors={errors}
        />

        <SelectInput
          label="Category"
          name="categoryId"
          register={register}
          errors={errors}
          options={categories}
        />

        <SelectInput
          label="Seller"
          name="sellerId"
          register={register}
          errors={errors}
          options={sellers}
        />

        <TextInput
          label="HSN Code"
          name="hsnCodeId"
          register={register}
          errors={errors}
        />

        <TextInput
          label="GST Rate"
          name="gstRate"
          type="number"
          register={register}
          errors={errors}
        />

        <ToggleInput
          label="Wholesale"
          name="isWholesale"
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

        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Images"
        />

        <ArrayItemsInput
          items={tags}
          setItems={setTags}
          itemTitle="Tag"
        />

        <TextareaInput
          label="Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ToggleInput
          label="Publish Product"
          name="isActive"
          register={register}
        />

      </div>

      <SubmitButton
        isLoading={createProduct.isPending || updateProduct.isPending}
        buttonTitle={updateData?.id ? "Update Product" : "Create Product"}
        loadingButtonTitle="Please wait..."
      />

    </form>
  );
}