export default function CTAButton({ href = "#checkout", children = "অর্ডার করতে চাই" }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f9b514] px-8 py-3 text-center text-xl font-bold text-black shadow-[0_5px_0_#b97d00] transition hover:-translate-y-0.5 hover:bg-[#c30e0e] hover:text-white hover:shadow-[0_6px_0_#7f0909] focus:outline-none focus:ring-4 focus:ring-[#f9b514]/40 sm:text-3xl"
    >
      {children}
    </a>
  );
}
