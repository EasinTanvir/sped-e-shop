import Image from "next/image";
import { notFound } from "next/navigation";

import OrderForm from "@/components/commerce/OrderForm";
import SiteHeader from "@/components/commerce/SiteHeader";
import { getSessionUser } from "@/lib/auth";
import { formatTk } from "@/lib";
import { getProductBySlug } from "@/lib/data";

const ProductDetailPage = async ({ params }) => {
  const { slug } = await params;
  const [product, user] = await Promise.all([
    getProductBySlug(slug),
    getSessionUser(),
  ]);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#F5F2E9] text-[#161F1A]">
      <SiteHeader />
      <section className="bg-white px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-[#161F1A]/10 bg-[#F5F2E9]">
            <span className="absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2 border-[#D6412C]" />
            <span className="absolute bottom-0 right-0 z-10 h-4 w-4 border-b-2 border-r-2 border-[#D6412C]" />
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit -rotate-2 items-center gap-2 border-2 border-dashed border-[#D6412C] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6412C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
              COD available
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase tracking-tight text-[#161F1A]">
              {product.name}
            </h1>

            <p className="mt-4 text-lg leading-8 text-[#161F1A]/60">
              {product.description}
            </p>

            <div className="mt-6 flex items-end gap-3 border-b border-dashed border-[#161F1A]/15 pb-6">
              <p className="text-4xl font-black text-[#D6412C]">
                {formatTk(product.price)}
              </p>
              {product.compareAtPrice ? (
                <p className="pb-1 font-mono text-lg font-bold text-[#161F1A]/35 line-through">
                  {formatTk(product.compareAtPrice)}
                </p>
              ) : null}
            </div>

            <p className="mt-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#161F1A]/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#161F1A]/40" />
              Stock: {product.stock} units
            </p>

            <div className="mt-7">
              <OrderForm product={product} user={user} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
