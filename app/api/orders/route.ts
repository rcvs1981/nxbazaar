import {db} from "@/lib/db";
import { NextResponse } from "next/server";
import { CreateOrderPayload } from "@/types/order";

// ✅ Generate Order Number
function generateOrderNumber(length: number): string {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let orderNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}

// ✅ CREATE ORDER
export async function POST(request: Request) {
  try {
    const body: CreateOrderPayload = await request.json();
    const { checkoutFormData, orderItems } = body;

    const {
      city,
      country,
      district,
      email,
      firstName,
      lastName,
      paymentMethod,
      phone,
      shippingCost,
      streetAddress,
      userId,
    } = checkoutFormData;

    const result = await db.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          firstName,
          lastName,
          email,
          phone,
          streetAddress,
          city,
          country,
          district,
          shippingCost: Number(shippingCost),
          paymentMethod,
          orderNumber: generateOrderNumber(8),
        },
      });

      await prisma.orderItem.createMany({
        data: orderItems.map((item) => ({
          productId: item.id,
          vendorId: item.vendorId, // ✅ FIX
          quantity: Number(item.qty),
          price: Number(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
        })),
      });

      const sales = await Promise.all(
        orderItems.map(async (item) => {
          const totalAmount =
            Number(item.salePrice) * Number(item.qty);

          return prisma.sale.create({
            data: {
              orderId: newOrder.id,
              productTitle: item.title,
              productImage: item.imageUrl,
              productPrice: Number(item.salePrice),
              productQty: Number(item.qty),
              productId: item.id,
              vendorId: item.vendorId,
              total: totalAmount,
            },
          });
        })
      );

      return { newOrder, sales };
    });

    return NextResponse.json(result.newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create Order", error },
      { status: 500 }
    );
  }
}

// ✅ GET ALL ORDERS
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { orderItems: true },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Fetch Orders", error },
      { status: 500 }
    );
  }
}