"use client";

import { useActionState } from "react";
import { createOrderAction } from "@/app/actions";
import { formatTk } from "@/lib/data";
import SubmitButton from "./SubmitButton";

const initialState = { ok: false, message: "" };

const inputClass =
  "mt-1 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

export default function OrderForm({ product }) {
  const [state, action] = useActionState(createOrderAction, initialState);

  return (
    <form action={action} className="space-y-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <input type="hidden" name="productSlug" value={product.slug} />
      <div>
        <p className="text-sm font-semibold text-zinc-500">Cash on delivery checkout</p>
        <h3 className="text-2xl font-black text-zinc-950">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-600">
          No online payment. Pay {formatTk(product.price)} when the product arrives.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold text-zinc-800">
          Full name
          <input className={inputClass} name="name" required />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Phone
          <input className={inputClass} name="phone" type="tel" required />
        </label>
      </div>
      <label className="block text-sm font-bold text-zinc-800">
        Email
        <input className={inputClass} name="email" type="email" required />
      </label>
      <label className="block text-sm font-bold text-zinc-800">
        Delivery address
        <textarea
          className="mt-1 min-h-24 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          name="address"
          required
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <label className="text-sm font-bold text-zinc-800">
          Quantity
          <input className={inputClass} name="quantity" type="number" min="1" defaultValue="1" />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Notes
          <input className={inputClass} name="notes" placeholder="Optional" />
        </label>
      </div>
      <div className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">
        Payment method: Cash on Delivery only.
      </div>
      {state.message ? (
        <p className={`rounded-md p-3 text-sm font-semibold ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </p>
      ) : null}
      <SubmitButton className="min-h-12 w-full rounded-md bg-red-600 px-5 py-3 text-base font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100">
        Place COD order
      </SubmitButton>
    </form>
  );
}
