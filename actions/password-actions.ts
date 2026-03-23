"use server";

import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/zod/auth";
import { api } from "@/lib/axios";

export async function forgotPasswordAction(data: unknown) {
  const parsed = forgotPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  try {
    const res = await api.put("/api/users/forgot-password", parsed.data);

    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
}

export async function resetPasswordAction(data: unknown) {
  const parsed = resetPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  try {
    const res = await api.put("/api/users/update-password", parsed.data);

    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
}