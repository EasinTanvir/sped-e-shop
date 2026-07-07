import Link from "next/link";
import ProductCard from "@/components/commerce/ProductCard";
import SiteHeader from "@/components/commerce/SiteHeader";
import { getSessionUser } from "@/lib/auth";
import { getProducts } from "@/lib/data";

const HomePage = async () => {
  const [products, user] = await Promise.all([getProducts(), getSessionUser()]);

  return (
    <main className="min-h-screen bg-[#F5F2E9] text-[#161F1A]">
      <SiteHeader />

      <section className="overflow-hidden bg-[#161F1A]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          {/* Perimeter frame — the "inspection zone" */}
          <div className="relative border border-dashed border-[#C9C2AC]/30 px-6 py-10 sm:px-10 sm:py-14">
            {/* Corner registration ticks */}
            <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#D6412C]" />
            <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-[#D6412C]" />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#D6412C]" />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#D6412C]" />

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit -rotate-2 items-center gap-2 border-2 border-dashed border-[#D6412C] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6412C]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
                  Cash on delivery only
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-[#F5F2E9] sm:text-6xl">
                  A cleaner home starts with products you can trust.
                </h1>

                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#C9C2AC]">
                  Shop pest-control essentials, create a customer account, place
                  a COD order, and track every status update from your panel.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="rounded-sm bg-[#D6412C] px-6 py-3 text-base font-black uppercase tracking-wide text-[#F5F2E9] transition hover:bg-[#b93521]"
                  >
                    Shop products
                  </Link>
                  <Link
                    href={user ? "/customer" : "/login"}
                    className="rounded-sm border border-[#C9C2AC]/40 px-6 py-3 text-base font-black uppercase tracking-wide text-[#F5F2E9] transition hover:border-[#F5F2E9]"
                  >
                    {user ? "My panel" : "Login to order"}
                  </Link>
                </div>

                {/* Specimen tags */}
                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-left">
                  {[
                    ["COD", "Only"],
                    ["Account", "Required"],
                    ["Email", "Updates"],
                  ].map(([value, label]) => (
                    <div key={label} className="relative pl-3">
                      <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
                      <dt className="text-xl font-black text-[#F5F2E9]">
                        {value}
                      </dt>
                      <dd className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#C9C2AC]">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4 border-b border-[#161F1A]/10 pb-5">
            <div>
              <p className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D6412C]">
                <span className="h-px w-8 bg-[#D6412C]" />
                Featured products
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#161F1A]">
                Ready for home delivery
              </h2>
            </div>
            <Link
              href="/products"
              className="whitespace-nowrap text-sm font-black uppercase tracking-wide text-[#D6412C] underline decoration-2 underline-offset-4 hover:text-[#b93521]"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default HomePage;
