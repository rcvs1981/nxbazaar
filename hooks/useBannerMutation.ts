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
import { BannerResponse, BannersResponse, CreateBannerInput, UpdateBannerInput } from "@/types/banner"

export function useCreateBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, CreateBannerInput>({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] })
    }
  })
}

export function useUpdateBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, UpdateBannerInput>({
    mutationFn: ({ id, ...data }) => updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] })
    }
  })
}

export function useDeleteBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, string>({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] })
    }
  })
}

export function useMultiDeleteBanner() {
  const queryClient = useQueryClient()

  return useMutation<BannerResponse, Error, string[]>({
    mutationFn: deleteMultipleBanners,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] })
    }
  })
}

export function useBanners(activeOnly?: boolean) {
  return useQuery<BannersResponse>({
    queryKey: ["banners", activeOnly],
    queryFn: () => getBanners(activeOnly),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useBanner(id: string) {
  return useQuery<BannerResponse>({
    queryKey: ["banner", id],
    queryFn: () => getBanner(id),
    enabled: !!id,
  })
}