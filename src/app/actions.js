"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSession,
  requireAdmin,
  requireCustomer,
  setSession,
} from "@/lib/auth";
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

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const LOCAL_UPLOAD_PREFIX = "/api/uploads/";

function isLocalUpload(imageUrl) {
  return imageUrl?.startsWith(LOCAL_UPLOAD_PREFIX);
}

async function deleteLocalUpload(imageUrl) {
  if (!isLocalUpload(imageUrl)) return;

  const filename = path.basename(imageUrl);
  await unlink(path.join(UPLOAD_DIR, filename)).catch(() => {});
}

async function saveProductImage(file) {
  if (!file || typeof file === "string" || file.size === 0) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, or GIF images are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Product image must be 5MB or smaller.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = path.extname(file.name || "").toLowerCase() || ".jpg";
  const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, filename), bytes);

  return `${LOCAL_UPLOAD_PREFIX}${filename}`;
}

export async function createOrderAction(formData) {
  const user = await requireCustomer();
  const productSlug = value(formData, "productSlug");
  const product = await getProductBySlug(productSlug);

  if (!product?.id) {
    return { ok: false, message: "Please choose an available product." };
  }

  const quantity = Math.max(1, parseIntField(formData, "quantity", 1));
  const name = user.name;
  const email = user.email;
  const phone = value(formData, "phone") || user.phone;
  const address = value(formData, "address");
  const notes = value(formData, "notes");

  if (!phone || !address) {
    return { ok: false, message: "Phone and delivery address are required." };
  }

  const total = product.price * quantity;
  const orderNumber = `COD-${Date.now().toString(36).toUpperCase()}`;

  await prisma.user.update({
    where: { id: user.id },
    data: { phone, address },
  });

  await prisma.order.create({
    data: {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: address,
      productId: product.id,
      customerId: user.id,
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
  revalidatePath("/customer/orders");

  return {
    ok: true,
    message: `Order ${orderNumber} received. Payment method: Cash on Delivery.`,
  };
}

export async function loginAction(formData) {
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

export async function registerAction(formData) {
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const phone = value(formData, "phone");
  const address = value(formData, "address");
  const password = value(formData, "password");

  if (!name || !email || !password || password.length < 8) {
    return {
      ok: false,
      message: "Name, email, and an 8 character password are required.",
    };
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
  const imageFile = formData.get("image");
  const price = parseIntField(formData, "price");
  const compareAtPrice = parseIntField(formData, "compareAtPrice");
  const stock = parseIntField(formData, "stock");
  const isActive = formData.get("isActive") === "on";

  if (!name || !slug || !description || !price) {
    return {
      ok: false,
      message: "Name, slug, description, and price are required.",
    };
  }

  let uploadedImageUrl = null;
  try {
    uploadedImageUrl = await saveProductImage(imageFile);
  } catch (error) {
    return { ok: false, message: error.message };
  }

  const existing = id
    ? await prisma.product.findUnique({ where: { id } })
    : null;

  const finalImageUrl = uploadedImageUrl || imageUrl;

  if (!finalImageUrl) {
    return { ok: false, message: "Upload an image or provide an image URL." };
  }

  const data = {
    name,
    slug,
    description,
    imageUrl: finalImageUrl,
    price,
    compareAtPrice: compareAtPrice || null,
    stock,
    isActive,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
    if (existing?.imageUrl !== finalImageUrl) {
      await deleteLocalUpload(existing?.imageUrl);
    }
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  if (existing?.slug && existing.slug !== slug)
    revalidatePath(`/products/${existing.slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/products");

  return { ok: true, message: id ? "Product updated." : "Product created." };
}

export async function deleteProductAction(formData) {
  await requireAdmin();

  const id = value(formData, "id");
  if (id) {
    const product = await prisma.product.findUnique({ where: { id } });
    await prisma.product.delete({ where: { id } });
    await deleteLocalUpload(product?.imageUrl);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/products");

  return { ok: true, message: "Product deleted." };
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
  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${id}`);
  revalidatePath("/customer");
  revalidatePath("/customer/orders");

  return { ok: true, message: `Order status updated to ${status}.` };
}
