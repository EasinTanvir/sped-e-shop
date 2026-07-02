import Link from "next/link";
import SiteHeader from "@/components/commerce/SiteHeader";
import { requireCustomer } from "@/lib/auth";
import { formatTk, orderStatusLabel } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CustomerPage() {
  const user = await requireCustomer();
  const orders = await prisma.order.findMany({
    where: { customerEmail: user.email },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">Customer panel</p>
          <h1 className="mt-2 text-4xl font-black">Welcome, {user.name}</h1>
          <p className="mt-3 text-zinc-600">Track your Cash on Delivery orders and current status.</p>
          <div className="mt-8 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
            <div className="grid grid-cols-5 gap-3 border-b border-zinc-200 bg-zinc-100 p-3 text-sm font-black text-zinc-700">
              <span>Order</span>
              <span>Product</span>
              <span>Total</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            {orders.length ? orders.map((order) => (
              <div key={order.id} className="grid grid-cols-5 gap-3 border-b border-zinc-100 p-3 text-sm last:border-b-0">
                <span className="font-bold">{order.orderNumber}</span>
                <span>{order.product?.name}</span>
                <span>{formatTk(order.total)}</span>
                <span className="font-bold capitalize text-red-600">{orderStatusLabel(order.status)}</span>
                <span>{new Date(order.createdAt).toLocaleDateString("en-BD")}</span>
              </div>
            )) : (
              <div className="p-6 text-center text-zinc-600">
                No orders yet. <Link href="/products" className="font-black text-red-600">Shop products</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
