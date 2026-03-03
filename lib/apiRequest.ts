import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/* ================================
   Axios Base
================================ */

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   GET (Fetch List)
================================ */

export const useApiGet = <T>(
  endpoint: string,
  queryKey: readonly unknown[]
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(`/${endpoint}`);
      return data;
    },
  });
};

/* ================================
   POST (Create)
================================ */

export const useApiPost = <T, D>(
  endpoint: string,
  queryKey: readonly unknown[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: D) => {
      const { data } = await axiosInstance.post<T>(
        `/${endpoint}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

/* ================================
   PUT (Update)
================================ */

export const useApiPut = <T, D>(
  endpoint: string,
  queryKey: readonly unknown[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: D;
    }) => {
      const { data } = await axiosInstance.put<T>(
        `/${endpoint}/${id}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

/* ================================
   DELETE (Single)
================================ */

export const useApiDelete = <T>(
  endpoint: string,
  queryKey: readonly unknown[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<T>(
        `/${endpoint}/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

/* ================================
   DELETE (Bulk)
================================ */

export const useApiBulkDelete = <T>(
  endpoint: string,
  queryKey: readonly unknown[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data } = await axiosInstance.post<T>(
        `/${endpoint}/bulk-delete`,
        { ids }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};