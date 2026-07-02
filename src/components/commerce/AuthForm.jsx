"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, registerAction } from "@/app/actions";
import SubmitButton from "./SubmitButton";

const initialState = { ok: false, message: "" };
const inputClass =
  "mt-1 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

export function LoginForm({ next = "" }) {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="mx-auto grid max-w-md gap-4 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
      <input type="hidden" name="next" value={next} />
      <div>
        <h1 className="text-3xl font-black">Login</h1>
        <p className="mt-1 text-sm text-zinc-600">Admin users go to the dashboard. Customers go to their panel.</p>
      </div>
      <label className="text-sm font-bold text-zinc-800">
        Email
        <input className={inputClass} name="email" type="email" required />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Password
        <input className={inputClass} name="password" type="password" required />
      </label>
      {state.message ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{state.message}</p> : null}
      <SubmitButton className="min-h-11 rounded-md bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700">
        Login
      </SubmitButton>
      <p className="text-center text-sm text-zinc-600">
        New customer? <Link href="/register" className="font-black text-red-600">Create account</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, initialState);

  return (
    <form action={action} className="mx-auto grid max-w-md gap-4 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-black">Customer account</h1>
        <p className="mt-1 text-sm text-zinc-600">Create an account to see your COD order history.</p>
      </div>
      <label className="text-sm font-bold text-zinc-800">
        Name
        <input className={inputClass} name="name" required />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Email
        <input className={inputClass} name="email" type="email" required />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Phone
        <input className={inputClass} name="phone" type="tel" />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Address
        <textarea className="mt-1 min-h-20 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" name="address" />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Password
        <input className={inputClass} name="password" type="password" minLength="8" required />
      </label>
      {state.message ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{state.message}</p> : null}
      <SubmitButton className="min-h-11 rounded-md bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700">
        Create customer account
      </SubmitButton>
    </form>
  );
}
