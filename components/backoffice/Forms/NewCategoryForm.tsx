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
import { useForm } from "react-hook-form";

interface CategoryFormData {
  title: string;
  description: string;
  isActive: boolean;
  
}

export default function NewCategory() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null); 
  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  async function onSubmit(data: CategoryFormData) {
    setLoading(true);
    try {
      const payload = {
        ...data,
        imageUrl,
        slug: generateSlug(data.title),
      };

      if (id) {
        
        await makePutRequest(`/api/categories/${id}`, payload);
      } else {
        
        await makePostRequest("/api/categories", payload);
      }
      reset();
      router.refresh();
      router.push("/dashboard/categories");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <FormHeader title="New Category" />
      
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput<CategoryFormData>
      label="Category Title"
      name="title"
      register={register}
      errors={errors}
      isRequired
      validation={{
        minLength: {
          value: 3,
          message: "Title must be at least 3 characters"
        }
      }}
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
    </div>
  );
}