"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} from "@/actions/category"
import { ActionResponse } from "@/types/action-response"
import { Category, CategoryFormData } from "@/types/category"
import { getCategories } from "@/actions/category.actions";


/* =====================================================
   CREATE CATEGORY
===================================================== */

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation<
    ActionResponse<Category>,  // ✅ return type fixed
    Error,
    CategoryFormData
  >({
    mutationFn: createCategory,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["categories"]
        })
      }
    }
  })
}
/* =====================================================
   UPDATE CATEGORY
===================================================== */

type UpdateCategoryVariables = {
  id: string
  data: CategoryFormData
}



export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation<
    ActionResponse<Category>,   // ✅ fixed return type
    Error,
    UpdateCategoryVariables
  >({
    mutationFn: ({ id, data }) =>
      updateCategory(id, data),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        })
      }
    },
  })
}
/* =====================================================
   DELETE CATEGORY
===================================================== */

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation<
    ActionResponse,   // ✅ fixed
    Error,
    string
  >({
    mutationFn: deleteCategory,

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        })
      }
    },
  })
}



/* =====================================================
   FETCH (Hybrid SSR + Client Cache)
===================================================== */

export function useCategories(initialData: Category[]) {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData,
    staleTime: 1000 * 60 * 5 // 5 min cache
  })
}


export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}