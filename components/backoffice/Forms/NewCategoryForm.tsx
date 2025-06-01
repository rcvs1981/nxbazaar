"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";

interface CategoryFormData {
  title: string;
  description?: string;
  isActive: boolean;
  slug?: string;
  imageUrl?: string;
  id?: string;
}

interface NewCategoryFormProps {
  updateData?: Partial<CategoryFormData>;
}

export default function NewCategoryForm({ updateData = {} }: NewCategoryFormProps) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  function redirect() {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data: CategoryFormData) {
    const slug = generateSlug(data.title);
    const formData = {
      ...data,
      slug,
      imageUrl,
      ...(id && { id }) // Only include id if it exists
    };

    console.log(formData);
    
    if (id) {
      // Make Put Request (Update)
      await makePutRequest(
        setLoading,
        `api/categories/${id}`,
        formData,
        "Category",
        redirect
      );
    } else {
      // Make Post Request (Create)
      await makePostRequest(
        setLoading,
        "api/categories",
        formData,
        "Category",
        () => {
          reset();
          setImageUrl("");
        },
        redirect
      );
    }
  }

  return (
    <div>
      <FormHeader title={id ? "Update Category" : "Create New Category"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register as UseFormRegister<CategoryFormData>}
            errors={errors as FieldErrors<CategoryFormData>}
            className="w-full"
            required
          />

          <TextareaInput
            label="Category Description"
            name="description"
            register={register as UseFormRegister<CategoryFormData>}
            errors={errors as FieldErrors<CategoryFormData>}
            className="w-full"
          />
          
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUploader"
            label="Category Image"
          />
          
          <ToggleInput
            label="Publish your Category"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register as UseFormRegister<CategoryFormData>}
            checked={isActive}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Category" : "Create Category"}
          loadingButtonTitle={`${
            id ? "Updating" : "Creating"
          } Category please wait...`}
        />
      </form>
    </div>
  );
}