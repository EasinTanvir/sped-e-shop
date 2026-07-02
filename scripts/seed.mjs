import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 120000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `${iterations}:${salt}:${hash}`;
}

const product = {
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

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "change-this-admin-password";
  const name = process.env.ADMIN_NAME || "Store Admin";

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      role: "ADMIN",
      passwordHash: hashPassword(password),
    },
    create: {
      name,
      email,
      role: "ADMIN",
      passwordHash: hashPassword(password),
    },
  });

  await prisma.product.upsert({
    where: { slug: product.slug },
    update: product,
    create: product,
  });

  console.log(`Seed complete. Admin login: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
