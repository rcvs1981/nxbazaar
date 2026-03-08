"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  deleteMultipleCoupons,
  getCoupons,
  getCoupon,
} from "@/actions/coupon"
import { CouponResponse, CouponsResponse, CreateCouponInput, UpdateCouponInput } from "@/types/coupon"

export function useCreateCoupon() {
  const queryClient = useQueryClient()

  return useMutation<CouponResponse, Error, CreateCouponInput>({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    }
  })
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient()

  return useMutation<CouponResponse, Error, UpdateCouponInput>({
    mutationFn: ({ id, ...data }) => updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    }
  })
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient()

  return useMutation<CouponResponse, Error, string>({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    }
  })
}

export function useMultiDeleteCoupon() {
  const queryClient = useQueryClient()

  return useMutation<CouponResponse, Error, string[]>({
    mutationFn: deleteMultipleCoupons,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    }
  })
}

export function useCoupons() {
  return useQuery<CouponsResponse>({
    queryKey: ["coupons"],
    queryFn: getCoupons,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useCoupon(id: string) {
  return useQuery<CouponResponse>({
    queryKey: ["coupon", id],
    queryFn: () => getCoupon(id),
    enabled: !!id,
  })
}