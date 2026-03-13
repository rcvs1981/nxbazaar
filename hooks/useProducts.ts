"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
} from "@/actions/products"

import {
  ProductRequest,
  CreateProductInput,
  UpdateProductInput
} from "@/types/product"


export function useProducts() {

  return useQuery<ProductRequest[]>({
    queryKey: ["products"],
    queryFn: () => getProducts()
  })

}


export function useCreateProduct() {

  const queryClient = useQueryClient()

  return useMutation<ProductRequest, Error, CreateProductInput>({
    mutationFn: (data) => createProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

}


export function useUpdateProduct() {

  const queryClient = useQueryClient()

  return useMutation<
    ProductRequest,
    Error,
    { id: string; data: UpdateProductInput }
  >({
    mutationFn: ({ id, data }) => updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

}


export function useDeleteProduct() {

  const queryClient = useQueryClient()

  return useMutation<ProductRequest, Error, string>({
    mutationFn: (id) => deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

}