import Link from "next/link";
import OrderStatusForm from "@/components/commerce/OrderStatusForm";
import { orderStatusLabel, formatTk } from "@/lib";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-red-600">
          Customer orders
        </p>
        <h1 className="mt-2 text-4xl font-black">Order management</h1>
        <p className="mt-2 text-zinc-600">
          View COD order details and send email notifications when status
          changes.
        </p>
      </div>

      <section className="mt-8 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-3 border-b border-zinc-200 bg-zinc-100 p-3 text-sm font-black text-zinc-700 lg:grid-cols-[1fr_1fr_1.2fr_0.8fr_1.4fr_0.5fr]">
          <span>Order</span>
          <span>Customer</span>
          <span>Product</span>
          <span>Total</span>
          <span>Status</span>
          <span>View</span>
        </div>
        {orders.length ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="grid gap-3 border-b border-zinc-100 p-3 text-sm last:border-b-0 lg:grid-cols-[1fr_1fr_1.2fr_0.8fr_1.4fr_0.5fr]"
            >
              <span>
                <strong>{order.orderNumber}</strong>
                <br />
                <span className="text-xs text-zinc-500">
                  {new Date(order.createdAt).toLocaleString("en-BD")}
                </span>
              </span>
              <span>
                {order.customerName}
                <br />
                <span className="text-xs text-zinc-500">
                  {order.customerPhone}
                </span>
              </span>
              <span>
                {order.product?.name} x {order.quantity}
              </span>
              <span className="font-black">{formatTk(order.total)}</span>
              <OrderStatusForm order={order} />
              <Link
                href={`/dashboard/orders/${order.id}`}
                className="font-black capitalize text-red-600"
              >
                {orderStatusLabel(order.status)}
              </Link>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-zinc-600">No orders yet.</div>
        )}
      </section>
    </div>
  );
}
