// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id: string;
  }
  
  interface Session {
    user: User;
  }
}