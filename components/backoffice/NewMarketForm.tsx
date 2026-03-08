"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { MarketFormData, marketSchema } from "@/lib/validators/market.schema";
import { generateSlug } from "@/lib/generateSlug";
import { useCreateMarket } from "@/hooks/useCreateMarket";

import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

type Category = {
  label: string;
  value: string;
};

type Props = {
  categories: Category[];
};

export default function NewMarketForm({ categories }: Props) {

  const [imageUrl, setImageUrl] = useState<string>("");

  const router = useRouter();

  const mutation = useCreateMarket();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MarketFormData>({
    resolver: zodResolver(marketSchema),
    defaultValues: {
      isActive: true,
      categoryIds: [],
    },
  });

  const isActive = watch("isActive");

  async function onSubmit(data: MarketFormData) {

    const slug = generateSlug(data.title);

    const payload: MarketFormData = {
      ...data,
      slug,
      logoUrl: imageUrl,
    };

    await mutation.mutateAsync(payload);

    reset();

    setImageUrl("");

    router.push("/dashboard/markets");
  }

  return (
    <div>
      <FormHeader title="New Market" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
          />

          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            options={categories}
            multiple
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="marketLogoUploader"
            label="Market Logo"
          />

          <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ToggleInput
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />

        </div>

        <SubmitButton
          isLoading={mutation.isPending}
          buttonTitle="Create Market"
          loadingButtonTitle="Creating Market please wait..."
        />

      </form>
    </div>
  );
}