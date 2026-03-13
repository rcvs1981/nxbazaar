"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";

import api from "@/lib/axios";
import { registerSchema, RegisterInput } from "@/lib/validators/registerSchema";

interface RegisterFormProps {
  role?: "USER" | "ADMIN" | "SELLER";
}

export default function RegisterForm({ role = "USER" }: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    try {
      setLoading(true);

      const payload = {
        ...data,
        role,
        plan,
      };

      const response = await api.post("/users", payload);

      const responseData = response.data;

      toast.success("User Created Successfully");

      reset();

      if (role === "USER") {
        router.push("/");
      } else {
        router.push(`/verify-email?userId=${responseData.data.id}`);
      }

      router.refresh();
    } catch (error: unknown) {
      setLoading(false);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as {
          response?: { status?: number };
        };

        if (err.response?.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
          return;
        }
      }

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <TextInput
        label=""
        name="role"
        register={register}
        errors={errors}
        type="hidden"
        defaultValue={role}
        className="mb-3"
      />

      <TextInput
        label="Your Full Name"
        name="name"
        register={register}
        errors={errors}
        type="text"
        className="mb-3"
      />

      <TextInput
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className="mb-3"
      />

      {emailErr && (
        <small className="text-red-600 -mt-2 mb-2 block">
          {emailErr}
        </small>
      )}

      <TextInput
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type="password"
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle="Register"
        loadingButtonTitle="Creating Please wait..."
      />

      <div className="flex gap-2 justify-between">

        <p className="text-xs text-gray-500 py-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </p>

        {role === "USER" ? (
          <p className="text-xs text-gray-500 py-4">
            Are you a Seller ?{" "}
            <Link
              href="/seller-pricing"
              className="font-medium text-purple-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        ) : (
          <p className="text-xs text-gray-500 py-4">
            Are you a User ?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        )}

      </div>
    </form>
  );
}