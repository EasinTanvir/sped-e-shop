import Image from "next/image";
import CTAButton from "./CTAButton";

const productImage =
  "https://greenpestbd.com/wp-content/uploads/2026/02/cockroach-killer.jpg";

export default function HealthRiskSection() {
  return (
    <section className="bg-white px-5 py-8 sm:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="overflow-hidden rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.28)]">
          <Image
            src={productImage}
            alt="Cockroach Killer spray bottle"
            width={1080}
            height={1080}
            className="h-auto w-full"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black leading-relaxed text-black sm:text-2xl">
            গবেষণা অনুযায়ী, বাসায় তেলাপোকা থাকলে অ্যালার্জি, শ্বাসকষ্ট, ইনফেকশন,
            খাবার দূষণ, চামড়ার সমস্যা, মানসিক চাপ ও ইনসমনিয়ার ঝুঁকি বেড়ে যায়।
            তেলাপোকার মল-মূত্র ও দেহাংশ বাতাস দূষিত করে, যা বাসার পরিবেশকেও
            নোংরা ও অস্বাস্থ্যকর করে তোলে।
          </h2>
          <div className="mt-7">
            <CTAButton />
          </div>
        </div>
      </div>
    </section>
  );
}
