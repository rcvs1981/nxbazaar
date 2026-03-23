"use client";

import { useMutation } from "@tanstack/react-query";
import api  from "@/lib/axios";
import { RegisterInput } from "@/lib/validators/registerSchema";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await api.post("/users", data);
      return response.data;
    },
  });
};