import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "admin@example.com") {
    throw new Error("Unauthorized");
  }

  return session;
}