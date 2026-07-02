import Link from "next/link";
import { logoutAction } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/orders", label: "Orders" },
];

export default async function DashboardLayout({ children }) {
  const admin = await requireAdmin();

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex min-h-16 items-center justify-between gap-3 border-b border-zinc-200 px-5">
            <Link href="/" className="text-lg font-black">Green Pest</Link>
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">Admin</span>
          </div>
          <div className="px-5 py-5">
            <p className="text-xs font-black uppercase text-zinc-400">Signed in</p>
            <p className="mt-1 truncate text-sm font-bold text-zinc-700">{admin.email}</p>
          </div>
          <nav className="grid gap-1 px-3 pb-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-black text-zinc-700 transition hover:bg-zinc-100 hover:text-red-600">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-zinc-200 p-3">
            <form action={logoutAction}>
              <button className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-black text-zinc-700 transition hover:bg-zinc-100">
                Logout
              </button>
            </form>
          </div>
        </aside>
        <section className="min-w-0 px-5 py-6 lg:px-8">{children}</section>
      </div>
    </main>
  );
}
