"use server";

import db from "@/lib/db";
import { checkoutSchema } from "@/lib/validations/checkoutSchema";

export async function createOrder(data: unknown) {
  const validated = checkoutSchema.parse(data);

  const order = await db.order.create({
    data: {
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      address: validated.address,
      city: validated.city,
      state: validated.state,
      zipCode: validated.zipCode,
      paymentMethod: validated.paymentMethod,
    },
  });

  return order;
}