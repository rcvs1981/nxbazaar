"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { MarketFormData } from "@/schemas/marketSchema";

export function useCreateMarket() {
  return useMutation({
    mutationFn: async (data: MarketFormData) => {
      const res = await axiosInstance.post("/markets", data);
      return res.data;
    },
  });
}