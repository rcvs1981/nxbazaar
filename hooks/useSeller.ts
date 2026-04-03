"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSeller,
  getSellers,
  deleteSeller,
  updateSeller,
} from "@/actions/Seller";

/* ---------------- TYPES ---------------- */

type Seller = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  sellerProfile?: {
    userId: string;
    contactPerson: string;
    phone: string;
  } | null;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/* ---------------- CREATE ---------------- */

export function useCreateSeller() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Seller>, Error, unknown>({
    mutationFn: createSeller,

    onSuccess: (res) => {
      if (!res.success) {
        throw new Error(res.error ?? "Create failed");
      }

      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },

    onError: (error: Error) => {
      console.error("CREATE SELLER ERROR:", error.message);
    },
  });
}

/* ---------------- UPDATE ---------------- */

export function useUpdateSeller() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Seller>,
    Error,
    { id: string; data: unknown }
  >({
    mutationFn: ({ id, data }) => updateSeller(id, data),

    onSuccess: (res) => {
      if (!res.success) {
        throw new Error(res.error ?? "Update failed");
      }

      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },

    onError: (error: Error) => {
      console.error("UPDATE SELLER ERROR:", error.message);
    },
  });
}

/* ---------------- DELETE ---------------- */

export function useDeleteSeller() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteSeller,

    onSuccess: (res) => {
      if (!res.success) {
        throw new Error(res.error ?? "Delete failed");
      }

      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },

    onError: (error: Error) => {
      console.error("DELETE SELLER ERROR:", error.message);
    },
  });
}

/* ---------------- GET ---------------- */

export function useGetSellers() {
  return useQuery<Seller[], Error>({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await getSellers();

      if (!res.success) {
        throw new Error(res.error ?? "Fetch failed");
      }

      return res.data ?? [];
    },

    staleTime: 1000 * 60 * 5,
  });
}