"use client";

import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { type MarketFormData } from "@/lib/validators/market.schema";

export function useCreateMarket() {
  return useMutation({
    mutationFn: async (data: MarketFormData) => {
      const response = await axiosInstance.post("/markets", data);
      return response.data;
    },
  });
}
