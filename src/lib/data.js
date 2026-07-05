import { prisma } from "@/lib/prisma";

export async function getProducts({ includeInactive = false } = {}) {
  let products = [];

  try {
    products = await prisma.product.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn(
      "Using fallback product because Prisma is not connected.",
      error?.message,
    );
  }

  return products;
}

export async function getProductBySlug(slug) {
  let product = null;

  try {
    product = await prisma.product.findUnique({ where: { slug } });
  } catch (error) {
    console.warn(
      "Using fallback product because Prisma is not connected.",
      error?.message,
    );
  }

  return product;
}

export function formatTk(amount) {
  return `Tk ${Number(amount || 0).toLocaleString("en-BD")}`;
}

export function orderStatusLabel(status) {
  return String(status || "PENDING")
    .toLowerCase()
    .replace("_", " ");
}
