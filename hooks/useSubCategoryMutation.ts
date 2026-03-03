"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteMultipleSubCategories,
} from "@/actions/subcategory"

export function useCreateSubCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] })
    },
  })
}

export function useUpdateSubCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSubCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] })
    },
  })
}

export function useDeleteSubCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] })
    },
  })
}

export function useMultiDeleteSubCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMultipleSubCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] })
    },
  })
}