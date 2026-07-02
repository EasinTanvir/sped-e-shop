import Image from "next/image";
import { notFound } from "next/navigation";
import OrderForm from "@/components/commerce/OrderForm";
import SiteHeader from "@/components/commerce/SiteHeader";
import { formatTk, getProductBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="bg-white px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 shadow-sm">
            <Image src={product.imageUrl} alt={product.name} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">COD available</p>
            <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">{product.description}</p>
            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-black text-red-600">{formatTk(product.price)}</p>
              {product.compareAtPrice ? (
                <p className="pb-1 text-lg font-bold text-zinc-400 line-through">{formatTk(product.compareAtPrice)}</p>
              ) : null}
            </div>
            <p className="mt-3 text-sm font-bold text-zinc-500">Stock: {product.stock} units</p>
            <div className="mt-7">
              <OrderForm product={product} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
