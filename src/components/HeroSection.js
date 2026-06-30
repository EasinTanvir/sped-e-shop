import Image from "next/image";
import CTAButton from "./CTAButton";

const heroImage =
  "https://greenpestbd.com/wp-content/uploads/2026/02/Green-Pest-telapoka-combo.jpg";

export default function HeroSection() {
  return (
    <section className="bg-white px-5 pb-8 pt-4 text-center sm:pb-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-black leading-tight text-[#d11818] sm:text-5xl">
          তেলাপোকা সমস্যা সমাধান করুন আজই!
        </h1>
        <p className="mt-3 text-xl font-bold text-black sm:text-3xl">
          তেলাপোকা নির্মূলের ১০০% কার্যকরি স্প্রে।
        </p>
        <p className="mt-1 text-3xl font-black leading-tight text-[#c81212] sm:text-6xl">
          ১০০% নিরাপদ ও পার্শ্বপ্রতিক্রিয়া মুক্ত
        </p>
        <div className="mt-6">
          <CTAButton />
        </div>
        <div className="mx-auto mt-8 max-w-xl overflow-hidden rounded-lg shadow-[0_0_18px_rgba(0,0,0,0.32)]">
          <Image
            src={heroImage}
            alt="Cockroach Killer Combo"
            width={1080}
            height={1080}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
