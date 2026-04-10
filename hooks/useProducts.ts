"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ProductRequest,
  CreateProductInput,
  UpdateProductInput,
} from "@/types/product";
import { ProductSchema } from "@/lib/validators/productSchema";
import { getProducts } from "@/actions/product.actions";
/* ================= GET ================= */

export function useProducts() {
  return useQuery<ProductRequest[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      return res.data;
    },
  });
}

/* ================= CREATE ================= */

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductRequest, Error, CreateProductInput>({
    mutationFn: async (data) => {
      const res = await axios.post("/api/products", data); // ✅ FIXED
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* ================= UPDATE ================= */

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    ProductRequest,
    Error,
    { id: string; data: UpdateProductInput }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`/api/products/${id}`, data); // ✅ FIXED
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* ================= DELETE ================= */

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductRequest, Error, string>({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/products/${id}`); // ✅ FIXED
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useProduct(
  slug: string,
  initialData: Product
) {
  return useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product> => {
      const res = await api.get(`/product/${slug}`);
      return ProductSchema.parse(res.data);
    },
    initialData,
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductTranslations } from "@/lib/api/productTranslation";

export function useProductTranslations(productId: string) {
  return useQuery({
    queryKey: ["product-translations", productId],
    queryFn: () => fetchProductTranslations(productId),
    enabled: !!productId,
  });
}



export function useCreateVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("/api/product-variants", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
    },
  });
}