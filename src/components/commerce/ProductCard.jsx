import Image from "next/image";
import Link from "next/link";
import { orderStatusLabel, formatTk } from "@/lib";

export default function ProductCard({ product }) {
  return (
    <article className="grid overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square bg-zinc-50"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="grid gap-3 p-4">
        <div>
          <h3 className="text-lg font-black text-zinc-950">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
            {product.description}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            {product.compareAtPrice ? (
              <p className="text-sm font-bold text-zinc-400 line-through">
                {formatTk(product.compareAtPrice)}
              </p>
            ) : null}
            <p className="text-2xl font-black text-red-600">
              {formatTk(product.price)}
            </p>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
