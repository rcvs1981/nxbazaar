"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useHsn = (search: string) => {
  return useQuery({
    queryKey: ["hsn", search],
    queryFn: async () => {
      const res = await api.get(`/hsn?search=${search}`);
      return res.data;
    },
     enabled: true, 
  });
};