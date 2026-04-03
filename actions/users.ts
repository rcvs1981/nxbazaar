"use server";

import { db } from "@/lib/db";
import {
  createUserSchema,
  updateUserSchema,
} from "@/lib/validators/userSchema";

/* ---------------- CREATE USER ---------------- */

export async function createUser(data: unknown) {
  const validated = createUserSchema.parse(data);

  const user = await db.user.create({
    data: validated,
  });

  return user;
}

/* ---------------- GET USERS ---------------- */

export async function getUsers() {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

/* ---------------- GET USER ---------------- */

export async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

/* ---------------- UPDATE USER ---------------- */

export async function updateUser(id: string, data: unknown) {
  const validated = updateUserSchema.parse(data);

  return await db.user.update({
    where: { id },
    data: validated,
  });
}

/* ---------------- DELETE USER ---------------- */

export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
    include: {
      farmerProfile: true,
    },
  });
}