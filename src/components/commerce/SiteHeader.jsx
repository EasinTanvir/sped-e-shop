import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-30 border-b border-[#161F1A]/10 bg-[#F5F2E9]/95 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link
          prefetch
          href="/"
          className="flex items-center gap-2 text-lg font-black uppercase tracking-tight text-[#161F1A]"
        >
          <span className="h-2 w-2 rounded-full bg-[#D6412C]" />
          ShopnoBD Shop
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link
            prefetch
            href="/products"
            className="rounded-sm px-3 py-2 uppercase tracking-wide text-[#161F1A]/70 hover:bg-[#161F1A]/5"
          >
            Products
          </Link>
          {user && (
            <>
              {user?.role === "ADMIN" ? (
                <Link
                  prefetch
                  href="/dashboard"
                  className="rounded-sm px-3 py-2 uppercase tracking-wide text-[#161F1A]/70 hover:bg-[#161F1A]/5"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  prefetch
                  href="/customer"
                  className="rounded-sm px-3 py-2 uppercase tracking-wide text-[#161F1A]/70 hover:bg-[#161F1A]/5"
                >
                  Customer
                </Link>
              )}
            </>
          )}

          {user ? (
            <form action={logoutAction}>
              <button className="rounded-sm border border-[#161F1A]/20 px-3 py-2 uppercase tracking-wide text-[#161F1A]/70 hover:bg-[#161F1A]/5">
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link
                prefetch
                href="/login"
                className="rounded-sm bg-[#161F1A] px-3 py-2 uppercase tracking-wide text-[#F5F2E9] hover:bg-[#D6412C]"
              >
                Login
              </Link>{" "}
              <Link
                prefetch
                href="/register"
                className="rounded-sm bg-[#D6412C] px-3 py-2 uppercase tracking-wide text-[#F5F2E9] "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
