// types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    role: UserRole;
    status: boolean;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: boolean;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    status: boolean;
    emailVerified?: Date | null;
  }
}