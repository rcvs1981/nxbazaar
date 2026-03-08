"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";

import { generateUserCode } from "@/lib/generateUserCode";
import { CreateSeller } from "@/hooks/useSellerMuation";

import { SellerInput } from "@/schemas/seller.schema";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  user: {
    id: string;
  };
};

export default function NewSellerForm({ user }: Props) {

  const [imageUrl, setImageUrl] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);

  const createSellerMutation = CreateSeller();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SellerInput>({
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: SellerInput) => {

    const code = generateUserCode("LFF", data.name);

    const payload: SellerInput = {
      ...data,
      code,
      userId: user.id,
      products,
      profileImageUrl: imageUrl,
    };

    createSellerMutation.mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });

  };

  const isActive = watch("isActive");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow dark:bg-gray-800 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        <TextInput
          label="Seller Full Name"
          name="name"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Seller Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Seller Email"
          name="email"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Land Size (Acres)"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Main Crop"
          name="mainCrop"
          register={register}
          errors={errors}
        />

        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="sellerProfileUploader"
          label="Seller Profile Image"
        />

        <TextareaInput
          label="Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <ToggleInput
          label="Seller Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

      </div>

      <SubmitButton
        isLoading={createSellerMutation.isPending}
        buttonTitle="Create Seller"
        loadingButtonTitle="Creating Seller..."
      />

    </form>
  );
}