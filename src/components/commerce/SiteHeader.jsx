import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link href="/" className="text-lg font-black tracking-normal text-zinc-950">
          Green Pest Shop
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link href="/products" className="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100">
            Products
          </Link>
          {user?.role === "ADMIN" ? (
            <Link href="/dashboard" className="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100">
              Dashboard
            </Link>
          ) : (
            <Link href="/customer" className="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100">
              Customer
            </Link>
          )}
          {user ? (
            <form action={logoutAction}>
              <button className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-700 hover:bg-zinc-100">
                Logout
              </button>
            </form>
          ) : (
            <Link href="/login" className="rounded-md bg-zinc-950 px-3 py-2 text-white hover:bg-red-600">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
