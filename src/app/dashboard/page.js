import SiteHeader from "@/components/commerce/SiteHeader";
import SubmitButton from "@/components/commerce/SubmitButton";
import { deleteProductAction, updateOrderStatusAction, upsertProductAction } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { defaultProduct, formatTk, orderStatusLabel } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const inputClass =
  "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

const statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

function ProductForm({ product }) {
  return (
    <form action={upsertProductAction} className="grid gap-3 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <input type="hidden" name="id" value={product?.id || ""} />
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-bold text-zinc-800">
          Name
          <input className={inputClass} name="name" defaultValue={product?.name || ""} required />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Slug
          <input className={inputClass} name="slug" defaultValue={product?.slug || ""} placeholder="auto-from-name" />
        </label>
      </div>
      <label className="text-sm font-bold text-zinc-800">
        Description
        <textarea
          className="mt-1 min-h-20 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          name="description"
          defaultValue={product?.description || ""}
          required
        />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Image URL
        <input className={inputClass} name="imageUrl" defaultValue={product?.imageUrl || ""} required />
      </label>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold text-zinc-800">
          Price
          <input className={inputClass} name="price" type="number" min="0" defaultValue={product?.price || ""} required />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Compare at
          <input className={inputClass} name="compareAtPrice" type="number" min="0" defaultValue={product?.compareAtPrice || ""} />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Stock
          <input className={inputClass} name="stock" type="number" min="0" defaultValue={product?.stock || 0} />
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm font-bold text-zinc-800">
          <input name="isActive" type="checkbox" defaultChecked={product?.isActive ?? true} className="h-4 w-4 accent-red-600" />
          Active
        </label>
      </div>
      <SubmitButton className="min-h-10 rounded-md bg-zinc-950 px-4 py-2 text-sm font-black text-white hover:bg-red-600">
        {product?.id ? "Save product" : "Create product"}
      </SubmitButton>
    </form>
  );
}

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const [products, orders] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Store operations</h1>
          <p className="mt-2 text-zinc-600">Signed in as {admin.email}. Manage products and Cash on Delivery orders.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-500">Products</p>
              <p className="text-3xl font-black">{products.length}</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-500">Orders</p>
              <p className="text-3xl font-black">{orders.length}</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-500">Pending</p>
              <p className="text-3xl font-black">{orders.filter((order) => order.status === "PENDING").length}</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-500">Revenue</p>
              <p className="text-3xl font-black">{formatTk(orders.reduce((sum, order) => sum + order.total, 0))}</p>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-black">Add product</h2>
            <div className="mt-4">
              <ProductForm product={products.length ? null : defaultProduct} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black">Product CRUD</h2>
            <div className="mt-4 grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="grid gap-3">
                  <ProductForm product={product} />
                  <form action={deleteProductAction} className="flex justify-end">
                    <input type="hidden" name="id" value={product.id} />
                    <button className="rounded-md border border-red-200 px-4 py-2 text-sm font-black text-red-600 hover:bg-red-50">
                      Delete product
                    </button>
                  </form>
                </div>
              ))}
              {!products.length ? (
                <p className="rounded-md border border-zinc-200 bg-white p-5 text-zinc-600">
                  No products in MongoDB yet. Save the prefilled form above to seed the first product.
                </p>
              ) : null}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black">Order management</h2>
            <div className="mt-4 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.4fr] gap-3 border-b border-zinc-200 bg-zinc-100 p-3 text-sm font-black text-zinc-700">
                <span>Order</span>
                <span>Customer</span>
                <span>Product</span>
                <span>Total</span>
                <span>Status email</span>
              </div>
              {orders.length ? orders.map((order) => (
                <div key={order.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1.4fr] gap-3 border-b border-zinc-100 p-3 text-sm last:border-b-0">
                  <span>
                    <strong>{order.orderNumber}</strong>
                    <br />
                    <span className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleString("en-BD")}</span>
                  </span>
                  <span>
                    {order.customerName}
                    <br />
                    <span className="text-xs text-zinc-500">{order.customerPhone}</span>
                  </span>
                  <span>{order.product?.name} x {order.quantity}</span>
                  <span className="font-black">{formatTk(order.total)}</span>
                  <form action={updateOrderStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="h-10 flex-1 rounded-md border border-zinc-300 bg-white px-2 text-sm capitalize">
                      {statuses.map((status) => (
                        <option key={status} value={status}>{orderStatusLabel(status)}</option>
                      ))}
                    </select>
                    <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-black text-white hover:bg-red-700">
                      Update
                    </button>
                  </form>
                </div>
              )) : (
                <div className="p-6 text-center text-zinc-600">No orders yet.</div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
