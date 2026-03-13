"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createBanner,
  updateBanner,
  deleteBanner,
  deleteMultipleBanners,
  getBanners,
  getBanner,
} from "@/actions/banner"

import {
  BannerResponse,
  BannersResponse,
  CreateBannerInput,
  UpdateBannerInput,
} from "@/types/banner"

const BANNER_QUERY_KEY = ["banners"]

/* ------------------ CREATE ------------------ */

export function useCreateBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, CreateBannerInput>({
    mutationFn: createBanner,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BANNER_QUERY_KEY,
      })
    },
  })
}

/* ------------------ UPDATE ------------------ */

export function useUpdateBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, UpdateBannerInput>({
    mutationFn: ({ id, ...data }) => updateBanner(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BANNER_QUERY_KEY,
      })
    },
  })
}

/* ------------------ DELETE ------------------ */

export function useDeleteBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, string>({
    mutationFn: deleteBanner,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BANNER_QUERY_KEY,
      })
    },
  })
}

/* ------------------ BULK DELETE ------------------ */

export function useMultiDeleteBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, string[]>({
    mutationFn: deleteMultipleBanners,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BANNER_QUERY_KEY,
      })
    },
  })
}

/* ------------------ GET ALL ------------------ */

export function useBanners(activeOnly?: boolean) {
  return useQuery<BannersResponse>({
    queryKey: [...BANNER_QUERY_KEY, activeOnly],

    queryFn: () => getBanners(activeOnly),

    staleTime: 1000 * 60 * 5,
  })
}

/* ------------------ GET ONE ------------------ */

export function useBanner(id: string) {
  return useQuery<BannerResponse>({
    queryKey: ["banner", id],

    queryFn: () => getBanner(id),

    enabled: Boolean(id),

    staleTime: 1000 * 60 * 5,
  })
}