import ProductCard from "@/components/commerce/ProductCard";
import SiteHeader from "@/components/commerce/SiteHeader";
import { getProducts } from "@/lib/data";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F5F2E9] text-[#161F1A]">
      <SiteHeader />
      <section className="bg-[#161F1A] px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D6412C]">
            <span className="h-px w-8 bg-[#D6412C]" />
            Product showcase
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#F5F2E9]">
            Shop pest-control essentials
          </h1>
          <p className="mt-3 max-w-2xl text-[#C9C2AC]">
            Browse available products. You will be asked to sign in before
            placing any Cash on Delivery order.
          </p>
        </div>
      </section>
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
