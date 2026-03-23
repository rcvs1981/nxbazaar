"use client";

import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "@/actions/password-actions";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordAction,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordAction,
  });
}