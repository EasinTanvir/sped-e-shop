import Image from "next/image";
import Link from "next/link";
import { orderStatusLabel, formatTk } from "@/lib";

export default function ProductCard({ product }) {
  return (
    <article className="group relative grid overflow-hidden rounded-sm border border-[#161F1A]/10 bg-white transition hover:border-[#161F1A]/25">
      <span className="absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-[#D6412C]" />
      <Link
        prefetch
        href={`/products/${product.slug}`}
        className="relative aspect-square bg-[#F5F2E9]"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="grid gap-3 border-t border-dashed border-[#161F1A]/15 p-4">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#161F1A]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#161F1A]/60">
            {product.description}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            {product.compareAtPrice ? (
              <p className="font-mono text-sm font-bold text-[#161F1A]/35 line-through">
                {formatTk(product.compareAtPrice)}
              </p>
            ) : null}
            <p className="text-2xl font-black text-[#D6412C]">
              {formatTk(product.price)}
            </p>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-sm bg-[#161F1A] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#F5F2E9] transition hover:bg-[#D6412C]"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
