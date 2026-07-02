import DeleteProductButton from "@/components/commerce/DeleteProductButton";
import ProductForm from "@/components/commerce/ProductForm";
import { defaultProduct } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-red-600">Products</p>
        <h1 className="mt-2 text-4xl font-black">Product CRUD</h1>
        <p className="mt-2 text-zinc-600">Create, edit, upload product images, and control storefront visibility.</p>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-black">Add product</h2>
        <div className="mt-4">
          <ProductForm product={products.length ? null : defaultProduct} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-black">Existing products</h2>
        <div className="mt-4 grid gap-5">
          {products.map((product) => (
            <div key={product.id} className="grid gap-3">
              <ProductForm product={product} />
              <div className="flex justify-end">
                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          ))}
          {!products.length ? (
            <p className="rounded-md border border-zinc-200 bg-white p-5 text-zinc-600">
              No products in MongoDB yet. Save the prefilled product above to seed your first storefront item.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
