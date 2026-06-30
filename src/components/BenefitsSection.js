const benefits = [
  "তেলাপোকা থেকে চিরতরে মুক্তি পেতে",
  "বাসায় তেলাপোকার বংশবিস্তার ধ্বংস",
  "পার্শ্বপ্রতিক্রিয়া মুক্ত ১০০% কার্যকরি স্প্রে",
  "ঘন্টায় কার্যকরি ফলাফল",
  "সাশ্রয়ী মূল্যে সেরা একটি প্রোডাক্ট",
  "সম্পুন্ন ইমোর্টেড প্রোডাক্ট",
  "সম্পূর্ণ রেডি টু স্প্রে হওয়াতে সহজেই ব্যবহার করা যায়।",
];

export default function BenefitsSection() {
  return (
    <section className="bg-[#d83c3c] px-5 py-8 text-white shadow-inner">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-black leading-snug sm:text-4xl">
          কেন মেডিসিনটি ব্যবহার করবেন ?
        </h2>
        <ul className="mx-auto mt-6 grid max-w-3xl gap-3 text-lg font-bold sm:text-2xl">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-base font-black text-[#d83c3c]">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
