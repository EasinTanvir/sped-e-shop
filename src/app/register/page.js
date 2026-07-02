import SiteHeader from "@/components/commerce/SiteHeader";
import { RegisterForm } from "@/components/commerce/AuthForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-wide text-red-600">Customer account</p>
            <h1 className="mt-2 text-4xl font-black">Create your panel before placing an order.</h1>
            <p className="mt-4 text-zinc-600">
              Your account keeps your COD order history, delivery details, and latest status updates in one clean dashboard.
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
