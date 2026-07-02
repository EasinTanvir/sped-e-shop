"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, requireAdmin, setSession } from "@/lib/auth";
import { getProductBySlug } from "@/lib/data";
import { sendOrderStatusEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { hashPassword, slugify, verifyPassword } from "@/lib/security";

function value(formData, key) {
  return String(formData.get(key) || "").trim();
}

function parseIntField(formData, key, fallback = 0) {
  const parsed = Number.parseInt(value(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function findOrCreateCustomer({ name, email, phone, address }) {
  if (!email) return null;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: {
        name: existing.name || name,
        phone: existing.phone || phone,
        address: existing.address || address,
      },
    });
  }

  return prisma.user.create({
    data: {
      name,
      email,
      phone,
      address,
      role: "CUSTOMER",
    },
  });
}

export async function createOrderAction(_state, formData) {
  const productSlug = value(formData, "productSlug");
  const product = await getProductBySlug(productSlug);

  if (!product?.id) {
    return { ok: false, message: "Please choose an available product." };
  }

  const quantity = Math.max(1, parseIntField(formData, "quantity", 1));
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const phone = value(formData, "phone");
  const address = value(formData, "address");
  const notes = value(formData, "notes");

  if (!name || !email || !phone || !address) {
    return { ok: false, message: "Name, email, phone, and address are required." };
  }

  const customer = await findOrCreateCustomer({ name, email, phone, address });
  const total = product.price * quantity;
  const orderNumber = `COD-${Date.now().toString(36).toUpperCase()}`;

  await prisma.order.create({
    data: {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: address,
      productId: product.id,
      customerId: customer?.id,
      quantity,
      unitPrice: product.price,
      total,
      paymentMethod: "COD",
      notes,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/customer");

  return {
    ok: true,
    message: `Order ${orderNumber} received. Payment method: Cash on Delivery.`,
  };
}

export async function loginAction(_state, formData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const next = value(formData, "next") || "/customer";

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return { ok: false, message: "Invalid email or password." };
  }

  await setSession(user);
  redirect(user.role === "ADMIN" ? "/dashboard" : next);
}

export async function registerAction(_state, formData) {
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const phone = value(formData, "phone");
  const address = value(formData, "address");
  const password = value(formData, "password");

  if (!name || !email || !password || password.length < 8) {
    return { ok: false, message: "Name, email, and an 8 character password are required." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  const data = {
    name,
    email,
    phone,
    address,
    passwordHash: hashPassword(password),
    role: "CUSTOMER",
  };

  const user = existing
    ? await prisma.user.update({ where: { id: existing.id }, data })
    : await prisma.user.create({ data });

  await setSession(user);
  redirect("/customer");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function upsertProductAction(formData) {
  await requireAdmin();

  const id = value(formData, "id");
  const name = value(formData, "name");
  const slug = slugify(value(formData, "slug") || name);
  const description = value(formData, "description");
  const imageUrl = value(formData, "imageUrl");
  const price = parseIntField(formData, "price");
  const compareAtPrice = parseIntField(formData, "compareAtPrice");
  const stock = parseIntField(formData, "stock");
  const isActive = formData.get("isActive") === "on";

  const data = {
    name,
    slug,
    description,
    imageUrl,
    price,
    compareAtPrice: compareAtPrice || null,
    stock,
    isActive,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/dashboard");
}

export async function deleteProductAction(formData) {
  await requireAdmin();

  const id = value(formData, "id");
  if (id) await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/dashboard");
}

export async function updateOrderStatusAction(formData) {
  await requireAdmin();

  const id = value(formData, "id");
  const status = value(formData, "status");

  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { product: true },
  });

  await sendOrderStatusEmail(order);

  revalidatePath("/dashboard");
  revalidatePath("/customer");
}
