import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/components/commerce/OrderForm";
import ProductCard from "@/components/commerce/ProductCard";
import SiteHeader from "@/components/commerce/SiteHeader";
import { formatTk, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products[0];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">Cash on delivery store</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              Pest control products delivered to your door.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-zinc-600">
              Order authentic home pest solutions with no advance payment. Choose your product, submit the COD form, and pay only when it arrives.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-md bg-red-600 px-6 py-3 text-base font-black text-white transition hover:bg-red-700">
                Shop products
              </Link>
              <a href="#checkout" className="rounded-md border border-zinc-300 bg-white px-6 py-3 text-base font-black text-zinc-950 transition hover:border-zinc-950">
                Order now
              </a>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
              {[["COD", "Only"], ["Free", "Delivery"], ["Fast", "Support"]].map(([value, label]) => (
                <div key={label} className="rounded-md border border-zinc-200 bg-zinc-50 p-3">
                  <dt className="text-xl font-black text-zinc-950">{value}</dt>
                  <dd className="text-xs font-bold uppercase text-zinc-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 shadow-sm">
            <Image src={featured.imageUrl} alt={featured.name} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["No online payment", "Every order is Cash on Delivery. No cards, gateways, or advance payment."],
            ["Product focused", "Clear prices, stock visibility, and direct product showcase pages."],
            ["Managed orders", "Customers can track their orders while admins update status and send email notices."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-md border border-zinc-200 bg-zinc-50 p-5">
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-600">Featured products</p>
              <h2 className="mt-2 text-3xl font-black">Ready for home delivery</h2>
            </div>
            <Link href="/products" className="text-sm font-black text-red-600 hover:text-red-700">
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

      <section id="checkout" className="bg-white px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-600">Quick order</p>
            <h2 className="mt-2 text-3xl font-black">Order {featured.name}</h2>
            <p className="mt-3 text-zinc-600">
              Today&apos;s price is <span className="font-black text-red-600">{formatTk(featured.price)}</span>. Submit your details and our team will confirm before delivery.
            </p>
          </div>
          <OrderForm product={featured} />
        </div>
      </section>
    </main>
  );
}
