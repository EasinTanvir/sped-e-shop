import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signSession, verifySessionToken } from "@/lib/security";

const COOKIE_NAME = "product_sell_session";
const MAX_AGE = 60 * 60 * 24 * 7;

export async function setSession(user) {
  const cookieStore = await cookies();
  const token = signSession({
    userId: user.id,
    role: user.role,
    expiresAt: Date.now() + MAX_AGE * 1000,
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);

  if (!session?.userId) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
      },
    });
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") redirect("/login?next=/dashboard");
  return user;
}

export async function requireCustomer() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/customer");
  return user;
}
