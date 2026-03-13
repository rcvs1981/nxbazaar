"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { loginSchema, LoginInput } from "@/lib/validators/loginSchema";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    try {
      setLoading(true);

      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginData?.error) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      toast.success("Login Successful");

      reset();

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Your email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="name@company.com"
          className="input-style"
        />

        {errors.email && (
          <p className="text-red-600 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Password
        </label>

        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="input-style"
        />

        {errors.password && (
          <p className="text-red-600 text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <Link
        href="/forgot-password"
        className="text-blue-600 text-sm"
      >
        Forgot Password
      </Link>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {/* Register */}
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600">
          Sign Up
        </Link>
      </p>

    </form>
  );
}