"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GST_OPTIONS } from "@/lib/constants/gst";
import HsnSelect from "@/components/FormInputs/HsnSelect";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

import { productSchema, ProductInput } from "@/lib/validators/productSchema";
import { generateSlug } from "@/lib/generateSlug";
import { generateBarcode } from "@/lib/generateBarcode";

import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";

/* ================= TYPES ================= */

type SelectOption = {
  id: string;
  title: string;
};

type SubCategoryOption = {
  id: string;
  title: string;
  categoryId: string;
  hsnCode?: {
    id: string;
    code: string;
    gstRate: number;
  } | null;
};

type Props = {
  categories?: SelectOption[];
  subCategories?: SubCategoryOption[];
  updateData?: Partial<ProductInput> & { id?: string };
};

/* ================= COMPONENT ================= */

export default function NewProductForm({
  categories = [],
  subCategories = [],
  updateData = {},
}: Props) {
  const router = useRouter();

  const [tags, setTags] = useState<string[]>(updateData?.tags ?? []);
  const [productImages, setProductImages] = useState<string[]>(
    updateData?.productImages ?? []
  );

  const [isGstLocked, setIsGstLocked] = useState(false);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm<ProductInput>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    isActive: true,
    isWholesale: false,

    // ✅ sanitize null values
    title: updateData?.title ?? "",
    slug: updateData?.slug ?? "",
    description: updateData?.description ?? "",

    sku: updateData?.sku ?? "",
    barcode: updateData?.barcode ?? "",
    productCode: updateData?.productCode ?? "",
    unit: updateData?.unit ?? "",

    productPrice: updateData?.productPrice ?? 0,
    salePrice: updateData?.salePrice ?? 0,
    wholesalePrice: updateData?.wholesalePrice ?? 0,
    wholesaleQty: updateData?.wholesaleQty ?? 0,

    productStock: updateData?.productStock ?? 0,

    categoryId: updateData?.categoryId ?? "",
    subCategoryId: updateData?.subCategoryId ?? "",
    hsnCodeId: updateData?.hsnCodeId ?? "",

    tags: updateData?.tags ?? [],
    productImages: updateData?.productImages ?? [],
  },
});
  const selectedCategoryId = watch("categoryId");
  const selectedSubCategoryId = watch("subCategoryId");
  const isWholesale = watch("isWholesale");
  const price = watch("productPrice");

  /* ================= FILTER SUBCATEGORIES ================= */

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (sub) => sub.categoryId === selectedCategoryId
    );
  }, [subCategories, selectedCategoryId]);

  /* ================= RESET SUBCATEGORY ================= */

 const [isInitialLoad, setIsInitialLoad] = useState(true);

useEffect(() => {
  if (isInitialLoad) {
    setIsInitialLoad(false);
    return;
  }
 setValue("subCategoryId", "");
  setValue("hsnCodeId", "");
  setValue("gstRate", 0);

  setIsGstLocked(false);
}, [selectedCategoryId]);
  /* ================= AUTO HSN + GST ================= */

 useEffect(() => {
  if (!selectedSubCategoryId) return;

  const sub = subCategories.find(
    (s) => s.id === selectedSubCategoryId
  );

  if (sub?.hsnCode) {
    setValue("hsnCodeId", sub.hsnCode.id);
    setValue("gstRate", sub.hsnCode.gstRate);
    setIsGstLocked(true);
  } else {
    // ✅ fallback reset
    setValue("hsnCodeId", "");
    setIsGstLocked(false);
  }
}, [selectedSubCategoryId, subCategories]);

  /* ================= AUTO GST BASED ON PRICE ================= */

  useEffect(() => {
  if (!price || isGstLocked) return;

  if (price <= 1000) {
    setValue("gstRate", 5);
  } else {
    setValue("gstRate", 12);
  }
}, [price, isGstLocked]);

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: ProductInput) => {
  try {
    const payload: ProductInput = {
      ...data,
      slug: updateData?.id
        ? data.slug ?? updateData.slug
        : generateSlug(data.title),
      barcode: data.barcode ?? generateBarcode(),
      tags,
      productImages,
    };

    console.log("Submitting:", payload);

    if (updateData?.id) {
      // ✅ UPDATE
      await updateProduct.mutateAsync({
        id: updateData.id,
        data: payload,
      });

      console.log("Updated ✅");
    } else {
      // ✅ CREATE
      await createProduct.mutateAsync(payload);

      console.log("Created ✅");
    }

    router.push("/dashboard/products");
  } catch (error) {
    console.log("Error ❌", error);
    alert("Something went wrong!");
  }
};
  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-4 rounded-lg shadow bg-orange-400/20 backdrop-blur border border-orange-300/30"
    >
      <div className="grid grid-cols-2 gap-4">

        <TextInput label="Product Title" name="title" register={register} errors={errors} />
        <TextInput label="SKU" name="sku" register={register} errors={errors} />
        <TextInput label="Barcode" name="barcode" register={register} errors={errors} />

        <TextInput label="Product Price" name="productPrice" type="number" register={register} errors={errors} />
        <TextInput label="Sale Price" name="salePrice" type="number" register={register} errors={errors} />

        <TextInput label="Stock" name="productStock" type="number" register={register} errors={errors} />
        <TextInput label="Unit" name="unit" register={register} errors={errors} />

        {/* ✅ CATEGORY */}
        <SelectInput
          label="Category"
          name="categoryId"
          register={register}
          errors={errors}
        options={categories.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }))}
        />

        {/* ✅ SUB CATEGORY */}
        <SelectInput
          label="Sub Category"
          name="subCategoryId"
          register={register}
          errors={errors}
            options={filteredSubCategories.map((sub) => ({
    label: sub.title,
    value: sub.id,
  }))}
        />

        {/* HSN */}
        <HsnSelect
          onChange={({ id, gstRate }) => {
            setValue("hsnCodeId", id);
            setValue("gstRate", gstRate);
            setIsGstLocked(true);
          }}
        />

        <input type="hidden" {...register("hsnCodeId")} />

        {/* GST */}
        <SelectInput
          label="GST Rate"
          name="gstRate"
          register={register}
          errors={errors}
          options={GST_OPTIONS}
          disabled={isGstLocked}
        />

        <ToggleInput label="Wholesale" name="isWholesale" register={register} />

        {isWholesale && (
          <>
            <TextInput label="Wholesale Price" name="wholesalePrice" type="number" register={register} errors={errors} />
            <TextInput label="Minimum Wholesale Qty" name="wholesaleQty" type="number" register={register} errors={errors} />
          </>
        )}

        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Images"
          setValue={setValue}
        />

        <ArrayItemsInput items={tags} setItems={setTags} itemTitle="Tag" />

        <TextareaInput label="Description" name="description" register={register} errors={errors} />

        <ToggleInput label="Publish Product" name="isActive" register={register} />

      </div>

      <SubmitButton
        isLoading={createProduct.isPending || updateProduct.isPending}
        buttonTitle={updateData?.id ? "Update Product" : "Create Product"}
        loadingButtonTitle="Please wait..."
      />
    </form>
  );
}