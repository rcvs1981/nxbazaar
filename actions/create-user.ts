"use server";

import { createUserSchema } from "@/lib/validators/user";
import bcrypt from "bcrypt";
import {db} from "@/lib/db";

export async function createUser(data: unknown) {
  const parsed = createUserSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { name, email, password, role, plan } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      plan,
    },
  });

  return user;
}