import SiteHeader from "@/components/commerce/SiteHeader";
import { LoginForm } from "@/components/commerce/AuthForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />
      <section className="px-5 py-12">
        <LoginForm next={params?.next || ""} />
      </section>
    </main>
  );
}
