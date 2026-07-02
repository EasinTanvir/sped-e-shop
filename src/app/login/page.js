import SiteHeader from "@/components/commerce/SiteHeader";
import { LoginForm } from "@/components/commerce/AuthForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">Account access</p>
            <h1 className="mt-2 text-4xl font-black">Order and manage everything from one account.</h1>
            <p className="mt-4 text-zinc-600">
              Customers can order only after login. Admins can manage products, orders, and customer status emails.
            </p>
          </div>
          <LoginForm next={params?.next || ""} />
        </div>
      </section>
    </main>
  );
}
