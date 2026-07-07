"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginAction, registerAction } from "@/app/actions";

const inputClass =
  "mt-1 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";
const errorClass = "mt-1 text-xs font-bold text-red-600";

export function LoginForm({ next = "" }) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  function onSubmit(values) {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("next", next);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.message) toast.error(result.message);
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-md gap-4 rounded-md border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-red-600">
          Secure access
        </p>
        <h1 className="mt-2 text-3xl font-black">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Admins go to the dashboard. Customers go to their order panel.
        </p>
      </div>
      <label className="text-sm font-bold text-zinc-800">
        Email
        <input
          className={inputClass}
          type="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address.",
            },
          })}
        />
        {errors.email ? (
          <p className={errorClass}>{errors.email.message}</p>
        ) : null}
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Password
        <input
          className={inputClass}
          type="password"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        {errors.password ? (
          <p className={errorClass}>{errors.password.message}</p>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="min-h-11 rounded-md bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-sm text-zinc-600">
        New customer?{" "}
        <Link prefetch href="/register" className="font-black text-red-600">
          Create account
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(values) {
    const formData = new FormData();
    for (const [key, fieldValue] of Object.entries(values)) {
      formData.set(key, fieldValue || "");
    }

    startTransition(async () => {
      const result = await registerAction(formData);
      if (result?.message) toast.error(result.message);
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-md gap-4 rounded-md border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-red-600">
          Customer panel
        </p>
        <h1 className="mt-2 text-3xl font-black">Create account</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Use your account to order and track Cash on Delivery purchases.
        </p>
      </div>
      <label className="text-sm font-bold text-zinc-800">
        Name
        <input
          className={inputClass}
          {...register("name", { required: "Name is required." })}
        />
        {errors.name ? (
          <p className={errorClass}>{errors.name.message}</p>
        ) : null}
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Email
        <input
          className={inputClass}
          type="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address.",
            },
          })}
        />
        {errors.email ? (
          <p className={errorClass}>{errors.email.message}</p>
        ) : null}
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Phone
        <input className={inputClass} type="tel" {...register("phone")} />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Address
        <textarea
          className="mt-1 min-h-20 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          {...register("address")}
        />
      </label>
      <label className="text-sm font-bold text-zinc-800">
        Password
        <input
          className={inputClass}
          type="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
        />
        {errors.password ? (
          <p className={errorClass}>{errors.password.message}</p>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="min-h-11 rounded-md bg-red-600 px-5 py-2 font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create customer account"}
      </button>
    </form>
  );
}
