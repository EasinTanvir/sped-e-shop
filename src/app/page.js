import BenefitsSection from "@/components/BenefitsSection";
import HealthRiskSection from "@/components/HealthRiskSection";
import HeroSection from "@/components/HeroSection";
import OrderFormSection from "@/components/OrderFormSection";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <BenefitsSection />
      <HealthRiskSection />
      <PricingSection />
      <TrustSection />
      <OrderFormSection />
    </main>
  );
}
