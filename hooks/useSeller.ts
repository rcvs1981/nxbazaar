"use client";
import { getSeller } from "@/actions/Seller";
import { useMutation } from "@tanstack/react-query";
import { createSeller } from "@/services/seller.service";
import axios from "axios";
export function CreateSeller() {

  return useMutation({
    mutationFn: createSeller,
  });

}

export function DeleteSeller() {

  return useMutation({
    mutationFn: async (id: string) => {

      const res = await axios.delete(`/api/sellers/${id}`);

      return res.data;

    },
  });

}




export function GetSellers() {

  return useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      return await getSellers();
    },
  });

}