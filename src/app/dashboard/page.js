import Link from "next/link";
import { orderStatusLabel, formatTk } from "@/lib";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [products, orders] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({
      include: { product: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-red-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-black">Store overview</h1>
          <p className="mt-2 text-zinc-600">
            Monitor products, COD orders, and current status updates.
          </p>
        </div>
        <Link
          href="/dashboard/products"
          className="rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
        >
          Manage products
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Products</p>
          <p className="mt-2 text-3xl font-black">{products.length}</p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Recent orders</p>
          <p className="mt-2 text-3xl font-black">{orders.length}</p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Pending</p>
          <p className="mt-2 text-3xl font-black">
            {orders.filter((order) => order.status === "PENDING").length}
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Recent revenue</p>
          <p className="mt-2 text-3xl font-black">{formatTk(revenue)}</p>
        </div>
      </div>

      <section className="mt-8 rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <h2 className="text-xl font-black">Latest orders</h2>
          <Link
            prefetch
            href="/dashboard/orders"
            className="text-sm font-black text-red-600"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-100">
          {orders.length ? (
            orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="grid gap-2 p-5 transition hover:bg-zinc-50 md:grid-cols-5"
              >
                <span className="font-black">{order.orderNumber}</span>
                <span>{order.customerName}</span>
                <span>{order.product?.name}</span>
                <span className="font-black">{formatTk(order.total)}</span>
                <span className="capitalize text-red-600">
                  {orderStatusLabel(order.status)}
                </span>
              </Link>
            ))
          ) : (
            <p className="p-6 text-center text-zinc-600">No orders yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
