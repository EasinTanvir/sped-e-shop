import Link from "next/link";
import { requireCustomer } from "@/lib/auth";
import { orderStatusLabel, formatTk } from "@/lib";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const user = await requireCustomer();
  const orders = await prisma.order.findMany({
    where: { OR: [{ customerId: user.id }, { customerEmail: user.email }] },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-red-600">
          My orders
        </p>
        <h1 className="mt-2 text-4xl font-black">Order history</h1>
        <p className="mt-2 text-zinc-600">
          Review your COD orders, delivery details, and current status.
        </p>
      </div>

      <section className="mt-8 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-3 border-b border-zinc-200 bg-zinc-100 p-3 text-sm font-black text-zinc-700 md:grid-cols-5">
          <span>Order</span>
          <span>Product</span>
          <span>Total</span>
          <span>Status</span>
          <span>Date</span>
        </div>
        {orders.length ? (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/customer/orders/${order.id}`}
              className="grid gap-3 border-b border-zinc-100 p-3 text-sm transition hover:bg-zinc-50 last:border-b-0 md:grid-cols-5"
            >
              <span className="font-black">{order.orderNumber}</span>
              <span>{order.product?.name}</span>
              <span>{formatTk(order.total)}</span>
              <span className="font-black capitalize text-red-600">
                {orderStatusLabel(order.status)}
              </span>
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-BD")}
              </span>
            </Link>
          ))
        ) : (
          <div className="p-6 text-center text-zinc-600">
            No orders yet.{" "}
            <Link href="/products" className="font-black text-red-600">
              Shop products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
