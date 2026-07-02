import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/auth";
import { formatTk, orderStatusLabel } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CustomerOrderDetailPage({ params }) {
  const user = await requireCustomer();
  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { id, OR: [{ customerId: user.id }, { customerEmail: user.email }] },
    include: { product: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/customer/orders" className="text-sm font-black text-red-600">Back to my orders</Link>
      <div className="mt-4 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="border-b border-zinc-200 pb-5">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">Order detail</p>
          <h1 className="mt-2 text-4xl font-black">{order.orderNumber}</h1>
          <p className="mt-2 capitalize text-zinc-600">Current status: <span className="font-black text-red-600">{orderStatusLabel(order.status)}</span></p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-md bg-zinc-50 p-4">
            <h2 className="font-black">Product</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              {order.product?.name}<br />
              Quantity: {order.quantity}<br />
              Unit price: {formatTk(order.unitPrice)}
            </p>
          </div>
          <div className="rounded-md bg-zinc-50 p-4">
            <h2 className="font-black">Payment</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              Method: Cash on Delivery<br />
              Total: <span className="font-black text-zinc-950">{formatTk(order.total)}</span><br />
              Placed: {new Date(order.createdAt).toLocaleString("en-BD")}
            </p>
          </div>
          <div className="rounded-md bg-zinc-50 p-4 md:col-span-2">
            <h2 className="font-black">Delivery address</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700">{order.deliveryAddress}</p>
          </div>
        </div>

        {order.notes ? (
          <div className="mt-5 rounded-md bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Your notes: {order.notes}
          </div>
        ) : null}
      </div>
    </div>
  );
}
