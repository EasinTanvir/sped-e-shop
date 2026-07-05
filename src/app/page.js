import Link from "next/link";
import ProductCard from "@/components/commerce/ProductCard";
import SiteHeader from "@/components/commerce/SiteHeader";
import { getSessionUser } from "@/lib/auth";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const [products, user] = await Promise.all([getProducts(), getSessionUser()]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-black text-red-600">
              Cash on Delivery only
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              A cleaner home starts with products you can trust.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-zinc-600">
              Shop pest-control essentials, create a customer account, place a
              COD order, and track every status update from your panel.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-md bg-red-600 px-6 py-3 text-base font-black text-white transition hover:bg-red-700"
              >
                Shop products
              </Link>
              <Link
                href={user ? "/customer" : "/login"}
                className="rounded-md border border-zinc-300 bg-white px-6 py-3 text-base font-black text-zinc-950 transition hover:border-zinc-950"
              >
                {user ? "My panel" : "Login to order"}
              </Link>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
              {[
                ["COD", "Only"],
                ["Account", "Required"],
                ["Email", "Updates"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-md border border-zinc-200 bg-zinc-50 p-3"
                >
                  <dt className="text-xl font-black text-zinc-950">{value}</dt>
                  <dd className="text-xs font-bold uppercase text-zinc-500">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-600">
                Featured products
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Ready for home delivery
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-black text-red-600 hover:text-red-700"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
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
