"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createOrderAction } from "@/app/actions";
import { formatTk } from "@/lib/data";

const inputClass =
  "mt-1 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";
const errorClass = "mt-1 text-xs font-bold text-red-600";

export default function OrderForm({ product, user }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: user?.phone || "",
      address: user?.address || "",
      quantity: 1,
      notes: "",
    },
  });

  if (!user) {
    return (
      <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-red-600">Login required</p>
        <h3 className="mt-2 text-2xl font-black text-zinc-950">Sign in to place a COD order</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Customers must have an account before ordering. After login, your order will be saved in your customer panel.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/login?next=/products/${product.slug}`}
            className="rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
          >
            Login to order
          </Link>
          <Link
            href="/register"
            className="rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 transition hover:border-zinc-950"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  function onSubmit(values) {
    const formData = new FormData();
    formData.set("productSlug", product.slug);
    formData.set("phone", values.phone);
    formData.set("address", values.address);
    formData.set("quantity", String(values.quantity));
    formData.set("notes", values.notes || "");

    startTransition(async () => {
      const result = await createOrderAction(formData);

      if (result?.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result?.message || "Unable to place order.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-zinc-500">Cash on delivery checkout</p>
        <h3 className="text-2xl font-black text-zinc-950">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-600">
          Signed in as <span className="font-black text-zinc-950">{user.email}</span>. Pay {formatTk(product.price)} on delivery.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-zinc-50 p-3">
          <p className="text-xs font-black uppercase text-zinc-500">Customer</p>
          <p className="mt-1 font-black text-zinc-950">{user.name}</p>
        </div>
        <label className="text-sm font-bold text-zinc-800">
          Phone
          <input
            className={inputClass}
            type="tel"
            {...register("phone", {
              required: "Phone number is required.",
              minLength: { value: 8, message: "Enter a valid phone number." },
            })}
          />
          {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
        </label>
      </div>

      <label className="block text-sm font-bold text-zinc-800">
        Delivery address
        <textarea
          className="mt-1 min-h-24 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          {...register("address", {
            required: "Delivery address is required.",
            minLength: { value: 10, message: "Address should be at least 10 characters." },
          })}
        />
        {errors.address ? <p className={errorClass}>{errors.address.message}</p> : null}
      </label>

      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <label className="text-sm font-bold text-zinc-800">
          Quantity
          <input
            className={inputClass}
            type="number"
            min="1"
            {...register("quantity", {
              required: "Quantity is required.",
              valueAsNumber: true,
              min: { value: 1, message: "Minimum quantity is 1." },
            })}
          />
          {errors.quantity ? <p className={errorClass}>{errors.quantity.message}</p> : null}
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Notes
          <input className={inputClass} placeholder="Optional delivery instruction" {...register("notes")} />
        </label>
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">
        Payment method: Cash on Delivery only. No online payment will be collected.
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="min-h-12 w-full rounded-md bg-red-600 px-5 py-3 text-base font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Placing order..." : "Place COD order"}
      </button>
    </form>
  );
}
