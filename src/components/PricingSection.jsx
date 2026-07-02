import CTAButton from "./CTAButton";

export default function PricingSection() {
  return (
    <section className="bg-[#fffdf8] px-5 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-black leading-snug text-[#e21515] sm:text-3xl">
          📦 সারাদেশে ফ্রী হোম-ডেলিভারি | অগ্রীম পেমেন্টের প্রয়োজন নেই 😇
        </h2>
        <div className="mx-auto mt-7 max-w-xl rounded-md border border-black/15 bg-white p-5 shadow-sm">
          <div className="space-y-2 text-2xl font-black sm:text-3xl">
            <p>
              রেগুলার প্রাইজঃ{" "}
              <span className="relative inline-block text-[#d11818]">
                ১৯৮০
                <span className="absolute left-0 top-1/2 h-1 w-full -rotate-6 bg-[#ff0000]" />
              </span>{" "}
              টাকা
            </p>
            <p>
              অফার প্রাইজঃ{" "}
              <span className="border-b-4 border-double border-[#ff0000] text-[#0c8f35]">
                ৯৯০
              </span>{" "}
              টাকা
            </p>
          </div>
          <div className="mt-7">
            <CTAButton />
          </div>
        </div>
      </div>
    </section>
  );
}
