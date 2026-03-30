"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  MarketFormData,
  marketFormSchema,
} from "@/lib/validators/market.schema";

import { generateSlug } from "@/lib/generateSlug";
import {
  useCreateMarket,
  useUpdateMarket,
} from "@/hooks/useMarket";

import { MarketInput } from "@/types/market"; // ✅ FIX

import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import MultiSelectDropdown from "@/components/FormInputs/MultiSelectDropdown";

type CategoryOption = {
  label: string;
  value: string;
};

type Market = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  categories: { id: string }[];
};

type Props = {
  categories: CategoryOption[];
  market?: Market;
};

export default function NewMarketForm({ categories, market }: Props) {
  const isEdit = Boolean(market);
  const router = useRouter();

  /* ================================
     MUTATIONS
  ================================= */
  const createMutation = useCreateMarket();
  const updateMutation = useUpdateMarket(); // ✅ FIX

  /* ================================
     IMAGE STATE
  ================================= */
  const [imageUrl, setImageUrl] = useState(
    market?.logoUrl ?? ""
  );

  /* ================================
     FORM
  ================================= */
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MarketFormData>({
    resolver: zodResolver(marketFormSchema),
    defaultValues: {
      title: market?.title ?? "",
      description: market?.description ?? "",
      isActive: market?.isActive ?? true,
      categoryIds:
        market?.categories.map((c) => c.id) ?? [],
    },
  });

  /* ================================
     SUBMIT
  ================================= */
  const onSubmit = async (data: MarketFormData) => {
    const payload: MarketInput = {
      ...data,
      slug: isEdit
        ? market?.slug ?? generateSlug(data.title)
        : generateSlug(data.title),
      logoUrl: imageUrl,
    };

    try {
      if (isEdit && market?.id) {
        await updateMutation.mutateAsync({
          id: market.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      router.push("/dashboard/markets");
    } catch (error) {
      // toast already handled
    }
  };

  return (
    <div>
      <FormHeader
        title={isEdit ? "Update Market" : "New Market"}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 border rounded-lg shadow mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2">

          {/* TITLE */}
          <TextInput<MarketFormData>
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
          />

          {/* CATEGORY */}
          <MultiSelectDropdown<MarketFormData>
            label="Select Categories"
            name="categoryIds"
            control={control}
            errors={errors}
            options={categories}
          />

          {/* IMAGE */}
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="marketLogoUploader"
            label="Market Logo"
          />

          {/* DESCRIPTION */}
          <TextareaInput<MarketFormData>
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />

          {/* STATUS */}
          <ToggleInput<MarketFormData>
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        {/* SUBMIT */}
        <SubmitButton
          isLoading={
            createMutation.isPending ||
            updateMutation.isPending
          }
          buttonTitle={
            isEdit ? "Update Market" : "Create Market"
          }
          loadingButtonTitle={
            isEdit
              ? "Updating..."
              : "Creating Market..."
          }
        />
      </form>
    </div>
  );
}