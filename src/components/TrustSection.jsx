import CTAButton from "./CTAButton";

const trustItems = [
  "সম্পূর্ণ ক্যাশ অন ডেলিভারি, কোন ধরনের অগ্রিম প্রদান করতে হয় না।",
  "প্রডাক্ট হাতে পেয়ে, দেখে চেক করে নেওয়ার সুবিধা।",
  "আমাদের প্রোডাক্ট টি শতভাগ অথেনটিক ও কার্যকরী।",
];

export default function TrustSection() {
  return (
    <section className="bg-white px-5 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-black text-[#d41a1a] sm:text-4xl">
          আমাদের উপর কেন আস্থা রাখবেন!
        </h2>
        <ul className="mt-7 space-y-4 text-lg font-bold text-black sm:text-2xl">
          {trustItems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 text-2xl text-[#fbba12]">➜</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
