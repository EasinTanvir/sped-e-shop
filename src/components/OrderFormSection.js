const inputClass =
  "mt-2 h-12 w-full rounded border border-black/20 bg-white px-3 text-base outline-none transition focus:border-[#c30e0e] focus:ring-2 focus:ring-[#c30e0e]/20";

export default function OrderFormSection() {
  return (
    <section id="checkout" className="bg-[#fbfbfb] px-5 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl border-2 border-[#3c494e] bg-white">
        <h2 className="px-4 py-5 text-center text-2xl font-black leading-snug text-[#b92424] sm:text-4xl">
          অর্ডার করতে নীচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন ⬇️
        </h2>
        <form className="grid gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black">Billing details</h3>
            <label className="block font-bold text-black">
              আপনার নামঃ
              <input className={inputClass} name="name" type="text" />
            </label>
            <label className="block font-bold text-black">
              Country / Region
              <select className={inputClass} name="country" defaultValue="Bangladesh">
                <option>Bangladesh</option>
              </select>
            </label>
            <label className="block font-bold text-black">
              আপনার সম্পূর্ন ঠিকানাঃ
              <textarea
                className="mt-2 min-h-28 w-full rounded border border-black/20 bg-white px-3 py-3 text-base outline-none transition focus:border-[#c30e0e] focus:ring-2 focus:ring-[#c30e0e]/20"
                name="address"
              />
            </label>
            <label className="block font-bold text-black">
              আপনার মোবাইল নাম্বারঃ
              <input className={inputClass} name="phone" type="tel" />
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-black">Your order</h3>
            <div className="rounded border border-black/15">
              <div className="grid grid-cols-2 border-b border-black/15 bg-[#f7f7f7] px-3 py-3 font-black">
                <span>Product</span>
                <span className="text-right">Subtotal</span>
              </div>
              <div className="grid grid-cols-2 border-b border-black/15 px-3 py-4 text-sm font-bold sm:text-base">
                <span>Cockroach Killer Combo × 1</span>
                <span className="text-right">990.00 ৳</span>
              </div>
              <div className="grid grid-cols-2 border-b border-black/15 px-3 py-3 font-bold">
                <span>Subtotal</span>
                <span className="text-right">990.00 ৳</span>
              </div>
              <div className="grid grid-cols-2 px-3 py-3 text-lg font-black">
                <span>Total</span>
                <span className="text-right">990.00 ৳</span>
              </div>
            </div>
            <div className="rounded border border-black/15 bg-[#f7f7f7] p-4">
              <p className="font-black">Cash on delivery</p>
              <p className="mt-1 text-sm font-semibold text-black/70">
                Pay with cash upon delivery.
              </p>
            </div>
            <p className="text-xs font-semibold leading-relaxed text-black/60">
              Your personal data will be used to process your order and support your
              experience throughout this website.
            </p>
            <button
              type="submit"
              className="min-h-12 w-full rounded bg-[#c30e0e] px-5 py-3 text-xl font-black text-white transition hover:bg-[#9f0c0c] focus:outline-none focus:ring-4 focus:ring-[#c30e0e]/30"
            >
              অর্ডার করুন 990.00৳
            </button>
          </div>
        </form>
      </div>
      <p className="mx-auto mt-6 max-w-5xl text-center text-lg font-black text-black sm:text-3xl">
        অর্ডার করতে কোন সমস্যা হলে এই নম্বরে কথা বলুনঃ 01781497209
      </p>
    </section>
  );
}
