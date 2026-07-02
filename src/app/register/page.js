import SiteHeader from "@/components/commerce/SiteHeader";
import { RegisterForm } from "@/components/commerce/AuthForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-12">
        <RegisterForm />
      </section>
    </main>
  );
}
