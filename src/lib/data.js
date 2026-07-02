import { prisma } from "@/lib/prisma";

export const defaultProduct = {
  name: "Cockroach Killer Combo",
  slug: "cockroach-killer-combo",
  description:
    "Ready-to-use pest control combo for homes, kitchens, storerooms, and offices. Cash on delivery only.",
  imageUrl:
    "https://greenpestbd.com/wp-content/uploads/2026/02/Green-Pest-telapoka-combo.jpg",
  price: 990,
  compareAtPrice: 1980,
  stock: 50,
  isActive: true,
};

export async function getProducts({ includeInactive = false } = {}) {
  let products = [];

  try {
    products = await prisma.product.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Using fallback product because Prisma is not connected.", error?.message);
  }

  if (products.length) return products;

  return [defaultProduct];
}

export async function getProductBySlug(slug) {
  let product = null;

  try {
    product = await prisma.product.findUnique({ where: { slug } });
  } catch (error) {
    console.warn("Using fallback product because Prisma is not connected.", error?.message);
  }

  if (product) return product;
  return slug === defaultProduct.slug ? defaultProduct : null;
}

export function formatTk(amount) {
  return `Tk ${Number(amount || 0).toLocaleString("en-BD")}`;
}

export function orderStatusLabel(status) {
  return String(status || "PENDING").toLowerCase().replace("_", " ");
}
