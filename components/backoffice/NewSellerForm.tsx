"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateUserCode } from "@/lib/generateUserCode";
import { useCreateSeller, useUpdateSeller } from "@/hooks/useSeller";
import { SellerSchema, SellerInput } from "@/lib/validators/seller.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SellerWithUser } from "@/types/seller";

interface Props {
  user?: SellerWithUser;
  isEdit?: boolean;
}

export default function NewSellerForm({ user, isEdit }: Props) {
  const router = useRouter();
  const entity = "Seller Profile";

  // ✅ Local State
  const [products, setProducts] = useState<string[]>(
    user?.sellerProfile?.products ?? []
  );

  const [imageUrl, setImageUrl] = useState<string>(
    user?.sellerProfile?.profileImageUrl ?? ""
  );

  // ✅ Mutations
  const createMutation = useCreateSeller();
  const updateMutation = useUpdateSeller();

  // ✅ Form Setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SellerInput>({
    resolver: zodResolver(SellerSchema),
    defaultValues: {
      name: user?.sellerProfile?.name ?? "",
      email: user?.sellerProfile?.email ?? "",
      phone: user?.sellerProfile?.phone ?? "",
      physicalAddress: user?.sellerProfile?.physicalAddress ?? "",
      contactPerson: user?.sellerProfile?.contactPerson ?? "",
      contactPersonPhone:
        user?.sellerProfile?.contactPersonPhone ?? "",
      turnover: Number(user?.sellerProfile?.turnover ?? 0),
      mainProduct: user?.sellerProfile?.mainProduct ?? "",
      terms: user?.sellerProfile?.terms ?? "",
      notes: user?.sellerProfile?.notes ?? "",
      isActive: user?.sellerProfile?.isActive ?? true,
      code: user?.sellerProfile?.code ?? "",
    },
  });

  const isActive = watch("isActive");

  // ✅ Reusable Success Handler
  const handleSuccess = (res: any, type: "create" | "update") => {
    if (!res?.success) {
      toast.error(res?.error || `Failed to ${type} ${entity}`);
      return;
    }

    toast.success(`${entity} ${type}d successfully`);
    reset();
    router.push("/dashboard/sellers");
  };

  // ✅ Submit Handler (🔥 FIXED)
  function onSubmit(data: SellerInput) {
   
    if (!user?.id) {
      toast.error("User ID missing");
      return;
    }

    const payload: SellerInput = {
      ...data,
      
      turnover: Number(data.turnover),
      products,
      profileImageUrl: imageUrl || undefined,
      code: isEdit
        ? data.code
        : generateUserCode("SEL", data.name),
    };

    console.log("FINAL PAYLOAD", payload); // ✅ DEBUG

    // 🔥 UPDATE
    if (isEdit && user?.id) {
      updateMutation.mutate(
        { id: user.id, data: payload },
        {
          onSuccess: (res) => handleSuccess(res, "update"),
          onError: (err) =>
            toast.error(err.message || "Update failed"),
        }
      );
      return;
    }

    // 🔥 CREATE
    createMutation.mutate(payload, {
      onSuccess: (res) => handleSuccess(res, "create"),
      onError: (err) =>
        toast.error(err.message || "Create failed"),
    });
  }

  // ✅ UI
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl p-4 bg-orange-400 border rounded-lg shadow mx-auto my-3"
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
          label="Business Address"
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
          register={register}
          errors={errors}
        />

        <TextInput
          label="Yearly Turnover"
          name="turnover"
          type="number"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Main Product"
          name="mainProduct"
          register={register}
          errors={errors}
        />

        {/* ✅ Products */}
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Products"
        />

        {/* ❌ REMOVED hidden userId */}

        {/* ✅ Image Upload */}
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
        />

        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
        />

        <ToggleInput
          label="Seller Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Inactive"
          register={register}
        />
      </div>

     
      <SubmitButton
        isLoading={createMutation.isPending || updateMutation.isPending}
        disabled={createMutation.isPending || updateMutation.isPending}
        buttonTitle={isEdit ? "Update Seller" : "Create Seller"}
        loadingButtonTitle={
          isEdit ? "Updating Seller..." : "Creating Seller..."
        }
      />
    </form>
  );
}