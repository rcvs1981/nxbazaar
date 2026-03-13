"use server"

import {db}from "@/lib/db"
import { CheckoutFormData, OrderItemInput } from "@/types/order"
import { generateOrderNumber, calculateGST } from "@/lib/orderUtils"
import { Order } from "@/types/order";
type CreateOrderInput = {
  checkoutFormData: CheckoutFormData
  orderItems: OrderItemInput[]
}

export async function createOrder({
  checkoutFormData,
  orderItems,
}: CreateOrderInput) {

  const gstRate = 18

  const { gstAmount, total } = calculateGST(
    checkoutFormData.subTotal,
    gstRate
  )

  const result = await db.$transaction(async (prisma) => {

    const newOrder = await prisma.order.create({
      data: {
        ...checkoutFormData,

        orderNumber: generateOrderNumber(8),

        gstRate,
        gstAmount,

        totalAmount:
          total + checkoutFormData.shippingCost,
      },
    })

    await prisma.orderItem.createMany({
      data: orderItems.map((item) => ({
        productId: item.id,
        vendorId: item.vendorId,
        quantity: item.qty,
        price: item.salePrice,
        orderId: newOrder.id,
        imageUrl: item.imageUrl,
        title: item.title,
      })),
    })

    await Promise.all(
      orderItems.map((item) =>
        prisma.sale.create({
          data: {
            orderId: newOrder.id,
            productTitle: item.title,
            productImage: item.imageUrl,
            productPrice: item.salePrice,
            productQty: item.qty,
            productId: item.id,
            vendorId: item.vendorId,
            total: item.salePrice * item.qty,
          },
        })
      )
    )

    return newOrder
  })

  return result
}




export async function getOrders(): Promise<Order[]> {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: true,
    },
  });

  return orders;
}