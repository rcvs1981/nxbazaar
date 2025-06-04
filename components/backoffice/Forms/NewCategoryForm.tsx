"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormData {
  id?: string;
  title: string;
  description: string;
  slug?: string;
  imageUrl?: string;
  isActive: boolean;
}

interface NewCategoryFormProps {
  updateData?: Partial<CategoryFormData>;
}

export default function NewCategoryForm({ updateData = {} }: NewCategoryFormProps) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
  const statusText = isActive ? "Active" : "Draft";
  const statusColor = isActive ? "text-green-500" : "text-yellow-500";
  function redirect(): void {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data: CategoryFormData): Promise<void> {
    const slug = generateSlug(data.title);
    const formData: CategoryFormData = {
      ...data,
      slug,
      imageUrl
    };

    try {
      if (id) {
        formData.id = id;
        await makePutRequest({
          setLoading,
          endpoint: `api/categories/${id}`,
          data: formData,
          resourceName: "Category",
          redirect
        });
      } else {
        await makePostRequest({
          setLoading,
          endpoint: "api/categories",
          data: formData,
          resourceName: "Category",
          reset,
          redirect
        });
        setImageUrl("");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
           isRequired
        />

        <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          label="Category Image"
        />

      <div className={`${statusColor} mb-4 font-medium`}>
        Status: {statusText}
      </div>

      <ToggleInput
        label="Publish your Category"
        name="isActive"
        trueTitle="Active"
        falseTitle="Draft"
        register={register}
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
  );
}