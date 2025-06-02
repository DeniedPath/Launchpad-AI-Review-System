// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // Replace with your own admin credentials or DB check
        if (email === "admin@example.com" && password === "admin123") {
          return { id: "1", name: "Admin", email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // custom login path
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
