import Link from "next/link";
import { requireCustomer } from "@/lib/auth";
import { orderStatusLabel, formatTk } from "@/lib";
import { prisma } from "@/lib/prisma";

export default async function CustomerPage() {
  const user = await requireCustomer();
  const orders = await prisma.order.findMany({
    where: { OR: [{ customerId: user.id }, { customerEmail: user.email }] },
    include: { product: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-red-600">
            Customer dashboard
          </p>
          <h1 className="mt-2 text-4xl font-black">Welcome, {user.name}</h1>
          <p className="mt-2 text-zinc-600">
            Track your Cash on Delivery orders and continue shopping.
          </p>
        </div>
        <Link
          href="/products"
          className="rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
        >
          Shop products
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Total orders</p>
          <p className="mt-2 text-3xl font-black">{orders.length}</p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">Active orders</p>
          <p className="mt-2 text-3xl font-black">
            {
              orders.filter(
                (order) => !["DELIVERED", "CANCELLED"].includes(order.status),
              ).length
            }
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-zinc-500">COD spent</p>
          <p className="mt-2 text-3xl font-black">
            {formatTk(orders.reduce((sum, order) => sum + order.total, 0))}
          </p>
        </div>
      </div>

      <section className="mt-8 rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <h2 className="text-xl font-black">Recent orders</h2>
          <Link
            href="/customer/orders"
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
                href={`/customer/orders/${order.id}`}
                className="grid gap-2 p-5 transition hover:bg-zinc-50 md:grid-cols-5"
              >
                <span className="font-black">{order.orderNumber}</span>
                <span>{order.product?.name}</span>
                <span>{formatTk(order.total)}</span>
                <span className="capitalize text-red-600">
                  {orderStatusLabel(order.status)}
                </span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-BD")}
                </span>
              </Link>
            ))
          ) : (
            <p className="p-6 text-center text-zinc-600">
              You have no orders yet.{" "}
              <Link href="/products" className="font-black text-red-600">
                Browse products
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
