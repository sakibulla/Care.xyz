import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }
  
  if (session.user.role !== "admin") {
    redirect("/");
  }
  
  return session;
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}
