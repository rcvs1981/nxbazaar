"use client"

import { useMutation } from "@tanstack/react-query"
import { createOrder } from "@/actions/createOrder"
import { CheckoutFormData, OrderItemInput } from "@/types/order"

type CreateOrderInput = {
  checkoutFormData: CheckoutFormData
  orderItems: OrderItemInput[]
}

export function useCreateOrder() {

  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      return await createOrder(data)
    },
  })
}