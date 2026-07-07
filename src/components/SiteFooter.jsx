import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#161F1A] px-5 py-12 text-[#C9C2AC]">
      <div className="relative mx-auto max-w-7xl border border-dashed border-[#C9C2AC]/20 px-6 py-10 sm:px-10">
        <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#D6412C]" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-[#D6412C]" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#D6412C]" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#D6412C]" />

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2 text-lg font-black uppercase tracking-tight text-[#F5F2E9]"
            >
              <span className="h-2 w-2 rounded-full bg-[#D6412C]" />
              ShopnoBD Shop
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6">
              Pest-control essentials for homes across Bangladesh. Order with
              confidence — pay only when it arrives at your door.
            </p>
            <div className="mt-5 inline-flex w-fit -rotate-2 items-center gap-2 border-2 border-dashed border-[#D6412C] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6412C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
              Cash on delivery only
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F5F2E9]/50">
              Shop
            </p>
            <ul className="mt-4 grid gap-3 text-sm font-bold">
              <li>
                <Link href="/products" className="hover:text-[#F5F2E9]">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#F5F2E9]">
                  Login to order
                </Link>
              </li>
              <li>
                <Link href="/customer" className="hover:text-[#F5F2E9]">
                  My panel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F5F2E9]/50">
              How it works
            </p>
            <ul className="mt-4 grid gap-3 text-sm font-bold">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
                Create an account
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
                Place a COD order
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6412C]" />
                Track by email
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F5F2E9]/50">
              Contact
            </p>
            <ul className="mt-4 grid gap-3 text-sm font-bold">
              <li>
                <a
                  href="mailto:support@shopnobd.shop"
                  className="hover:text-[#F5F2E9]"
                >
                  support@shopnobd.shop
                </a>
              </li>
              <li>
                <a href="tel:+8800000000" className="hover:text-[#F5F2E9]">
                  +880 00 000 0000
                </a>
              </li>
              <li className="text-[#C9C2AC]/70">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-dashed border-[#C9C2AC]/20 pt-6 text-xs font-bold uppercase tracking-[0.15em] text-[#C9C2AC]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ShopnoBD Shop. All rights reserved.
          </p>
          <p>Serving Dhaka & nationwide COD delivery</p>
        </div>
      </div>
    </footer>
  );
}
