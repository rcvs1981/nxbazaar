"use client";

import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

/* ================================
   TYPES
================================ */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ================================
   AXIOS
================================ */

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

/* ================================
   GLOBAL TOAST
================================ */

function successToast<T>(res: ApiResponse<T>) {
  if (res.success) toast.success(res.message);
}

function errorToast(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";
  toast.error(message);
}

/* ================================
   GET
================================ */

export const useApiGet = <T>(
  endpoint: string,
  queryKey: string[]
) => {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<T> => {
      try {
        const res = await api.get(endpoint);

        // ✅ important: backend structure handle
        return res.data?.data ?? ([] as T);
      } catch (error) {
        console.error("API ERROR:", error);

        return [] as T; // ✅ NEVER undefined
      }
    },
  });
};
/* ================================
   POST
================================ */

export function useApiPost<TResponse, TPayload>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TResponse>, Error, TPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<ApiResponse<TResponse>>(
        endpoint,
        payload
      );
      return data;
    },

    onSuccess: (res) => {
      successToast(res);
      queryClient.invalidateQueries({ queryKey });
    },

    onError: errorToast,
  });
}

/* ================================
   PUT
================================ */

export function useApiPut<TResponse, TPayload>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<TResponse>,
    Error,
    { id: string; payload: TPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const { data } = await api.put<ApiResponse<TResponse>>(
        `${endpoint}/${id}`,
        payload
      );
      return data;
    },

    onSuccess: (res) => {
      successToast(res);
      queryClient.invalidateQueries({ queryKey });
    },

    onError: errorToast,
  });
}

/* ================================
   DELETE
================================ */

export function useApiDelete<TResponse>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TResponse>, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.delete<ApiResponse<TResponse>>(
        `${endpoint}/${id}`
      );
      return data;
    },

    onSuccess: (res) => {
      successToast(res);
      queryClient.invalidateQueries({ queryKey });
    },

    onError: errorToast,
  });
}

/* ================================
   OPTIMISTIC UPDATE
================================ */

export function useOptimisticMutation<TData, TResponse>(
  queryKey: readonly unknown[],
  mutationFn: (data: TData) => Promise<ApiResponse<TResponse>>
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TResponse>, Error, TData>({
    mutationFn,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const previous =
        queryClient.getQueryData<TResponse[]>(queryKey);

      queryClient.setQueryData<TResponse[]>(queryKey, (old = []) => [
        ...old,
        newData as unknown as TResponse,
      ]);

      return { previous };
    },

    onError: (_err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useApiBulkDelete<TResponse>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TResponse>, Error, string[]>({
    mutationFn: async (ids) => {
      const { data } = await api.delete<ApiResponse<TResponse>>(
        endpoint,
        {
          data: { ids }, 
        }
      );
      return data;
    },

    onSuccess: (res) => {
      successToast(res);
      queryClient.invalidateQueries({ queryKey });
    },

    onError: errorToast,
  });
}