"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerInput } from "@/lib/validators/customer.schema";
import { useRouter } from "next/navigation";
import { useUpdateCustomer } from "@/hooks/useCustomers";
import { updateCustomer } from "@/services/customerService";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";

interface Props {
  user: {
    id: string;
    name?: string;
    username?: string;
    email?: string;
  };
}

export default function CustomerForm({ user }: Props) {

  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  // React Query Mutation Hook
  const mutation = useUpdateCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      ...user,
      userId: user.id
    }
  });

  const onSubmit = async (data) => {
  await updateCustomer({
    id: customer.id,
    ...data
  });
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto p-6  rounded-lg shadow"
    >

      <h2 className="text-xl font-semibold mb-6">
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        <TextInput
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Username"
          name="username"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Phone"
          name="phone"
          register={register}
          errors={errors}
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="customerProfileUploader"
          label="Profile Image"
        />

      </div>

      <h2 className="text-xl font-semibold mt-10 mb-6">
        Shipping Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
        />

        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
        />

      </div>

      <div className="mt-8">

        <SubmitButton
          isLoading={mutation.isPending}
          buttonTitle="Update Customer"
          loadingButtonTitle="Updating..."
        />

      </div>

    </form>
  );
}