"use server";

import { db } from "@/lib/db";
import { CustomerInput } from "@/lib/validators/customer.schema";
import { revalidatePath } from "next/cache";

/* CREATE */
export async function createCustomer(data: CustomerInput) {
  try {
    const customer = await db.user.create({
      data: {
        ...data,
        role: "USER",
      },
    });

    revalidatePath("/dashboard/customers");

    return { success: true, data: customer };
  } catch {
    return { success: false, error: "Failed to create customer" };
  }
}

/* GET ALL */
export async function getCustomers() {
  const customers = await db.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      profile: true,
    },
  });

  return customers;
}

/* GET SINGLE */
export async function getCustomer(id: string) {
  const customer = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  return customer;
}

/* UPDATE */
export async function updateCustomer(id: string, data: CustomerInput) {
  try {
    const customer = await db.user.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/customers");

    return { success: true, data: customer };
  } catch {
    return { success: false, error: "Failed to update customer" };
  }
}

/* DELETE */
export async function deleteCustomer(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/customers");

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete customer" };
  }
}