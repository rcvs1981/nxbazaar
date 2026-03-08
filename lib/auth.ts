import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"

import {db} from "@/lib/db"
import { loginSchema } from "@/lib/validators/auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        const parsed = loginSchema.safeParse(credentials)

        if (!parsed.success) {
          return null
        }

        const { email, password } = parsed.data

        const user = await db.user.findUnique({
          where: { email },
        })

        if (!user) return null

        const match = await bcrypt.compare(password, user.password)

        if (!match) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          emailVerified: user.emailVerified,
        }
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user }) {

      if (user) {
        token.id = user.id
        token.role = user.role
        token.status = user.status
        token.emailVerified = user.emailVerified
      }

      return token
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.status = token.status
        session.user.emailVerified = token.emailVerified
      }

      return session
    },
  },
})