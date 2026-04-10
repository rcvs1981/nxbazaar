"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useHsn } from "@/hooks/useHsn";

import HsnSearchSelect from "@/components/FormInputs/HsnSearchSelect";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

import { subCategorySchema } from "@/lib/validators/subcategory.schema";
import {
  useCreateSubCategory,
  useUpdateSubCategory,
} from "@/hooks/useSubCategoryMutation";

/* ================= TYPES ================= */

type CategoryOption = {
  id: string;
  title: string;
};

type SubCategoryData = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  categoryId: string;
  hsnCodeId?: string | null;
};

type FormInput = {
  title: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  categoryId: string;
  hsnCodeId?: string;
};

/* ================= PROPS ================= */

interface Props {
  categories: CategoryOption[];
  updateData?: SubCategoryData;
}

/* ================= COMPONENT ================= */

export default function SubCategoryForm({
  categories,
  updateData,
}: Props) {

  const router = useRouter();
const [imageUrl, setImageUrl] = useState(updateData?.imageUrl ?? "");
  const [selectedHsn, setSelectedHsn] = useState<HsnItem | null>(null);

  const createMutation = useCreateSubCategory();
  const updateMutation = useUpdateSubCategory();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      title: updateData?.title ?? "",
      description: updateData?.description ?? "",
      imageUrl: updateData?.imageUrl ?? "",
      isActive: updateData?.isActive ?? true,
      categoryId: updateData?.categoryId ?? "",
      hsnCodeId: updateData?.hsnCodeId ?? "",
    },
  });

  /* ================= CATEGORY OPTIONS ================= */

  const categoryOptions = categories.map((cat) => ({
  label: cat.title,
  value: cat.id,
}));

  /* ================= SUBMIT ================= */

  function onSubmit(data: FormInput) {
    const payload = {
      ...data,
      hsnCodeId: data.hsnCodeId || undefined,
    };

    if (updateData?.id) {
      updateMutation.mutate(
        { id: updateData.id, data: payload },
        {
          onSuccess: () => router.push("/dashboard/subcategories"),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          router.push("/dashboard/subcategories");
        },
      });
    }
  }

  /* ================= UI ================= */

  return (
<form
  onSubmit={handleSubmit(onSubmit)}
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-5xl mx-auto p-6 rounded-xl 
  
  border-2 border-orange-500 dark:border-orange-900
  shadow-sm space-y-6"
>
  {/* HEADER */}
 <div className="mb-5 p-0 pb-5 border-b-2 border-orange-500 dark:border-orange-900">
  <h2 className="text-lg font-semibold leading-none text-gray-800 dark:text-gray-200">
    {updateData ? "Update SubCategory" : "Create SubCategory"}
  </h2>
</div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
  
  <SelectInput
    label="Category"
    name="categoryId"
    register={register}
    errors={errors}
    options={categoryOptions}
  />

  {/* HSN */}
  <div className="flex flex-col h-full">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      HSN Code
    </label>

    <div className="flex-1">
      <HsnSearchSelect
        value={selectedHsn}
        onChange={(item) => {
          setSelectedHsn(item);
          setValue("hsnCodeId", item.id);
        }}
      />
    </div>
  </div>

</div>
  {/* TITLE + DESCRIPTION */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <TextInput
      label="Title"
      name="title"
      register={register}
      errors={errors}
    />

    <TextareaInput
      label="Description"
      name="description"
      register={register}
      errors={errors}
    />
  </div>

  {/* IMAGE + STATUS */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ImageInput
      label="Image"
      imageUrl={imageUrl}
      setImageUrl={(url) => {
        setImageUrl(url);
        setValue("imageUrl", url);
      }}
    />

    <ToggleInput
      label="Active"
      name="isActive"
      register={register}
    />
  </div>

  {/* SUBMIT */}
  <div className="pt-6 border-t-2 border-orange-500 dark:border-orange-900">
    <SubmitButton
      isLoading={createMutation.isPending || updateMutation.isPending}
      buttonTitle={
        updateData ? "Update SubCategory" : "Create SubCategory"
      }
      loadingButtonTitle="Saving..."
      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
    />
  </div>
</form>
);
}