"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema, CategoryInput } from "@/lib/validators/category.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategoryAction, updateCategoryAction } from "@/actions/categories/categoryActions";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

interface Props {
  updateData?: Partial<CategoryInput> & { id?: string };
}

export default function NewCategoryForm({ updateData = {} }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(updateData.imageUrl ?? "");

 const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<CategoryInput>({
  resolver: zodResolver(CategorySchema),
  defaultValues: {
    title: updateData.title ?? "",
    description: updateData.description ?? "",
    imageUrl: updateData.imageUrl ?? "",
    isActive: updateData.isActive ?? true,
  },
});

  const mutation = useMutation({
    mutationFn: (data: CategoryInput) =>
      updateData?.id
        ? updateCategoryAction(updateData.id, data)
        : createCategoryAction(data),

    onSuccess: () => {
      router.push("/dashboard/categories");
      router.refresh();
    },
  });

  const onSubmit = (data: CategoryInput) => {
    mutation.mutate({
      ...data,
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        label="Category Title"
        name="title"
        register={register}
        errors={errors}
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
        register={register}
      />

      {mutation.isError && (
        <p className="text-red-500 text-sm">
          Failed to save category. Please try again.
        </p>
      )}

      <SubmitButton
        isLoading={mutation.isPending}
        buttonTitle={updateData?.id ? "Update Category" : "Create Category"}
      />
    </form>
  );
}