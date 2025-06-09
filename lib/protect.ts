import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!session || !email) {
    throw new Error("Unauthorized");
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    throw new Error("Unauthorized");
  }

  return session;
}