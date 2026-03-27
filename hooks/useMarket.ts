
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Market, MarketInput } from "@/types/market";
export function useMarkets() {
  return useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const { data } = await api.get("/markets");
      return data;
    },
  });
}

export function useCreateMarket() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return api.post("/markets", data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["markets"] });
    },
  });
}