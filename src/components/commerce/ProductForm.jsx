"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { upsertProductAction } from "@/app/actions";

const inputClass =
  "mt-1 h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";
const errorClass = "mt-1 text-xs font-bold text-red-600";

export default function ProductForm({ product }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      imageUrl: product?.imageUrl || "",
      price: product?.price || "",
      compareAtPrice: product?.compareAtPrice || "",
      stock: product?.stock ?? 0,
      isActive: product?.isActive ?? true,
    },
  });

  function onSubmit(values) {
    const formData = new FormData();
    formData.set("id", product?.id || "");
    formData.set("name", values.name);
    formData.set("slug", values.slug);
    formData.set("description", values.description);
    formData.set("imageUrl", values.imageUrl || "");
    formData.set("price", String(values.price));
    formData.set("compareAtPrice", values.compareAtPrice ? String(values.compareAtPrice) : "");
    formData.set("stock", String(values.stock || 0));
    if (values.isActive) formData.set("isActive", "on");
    if (values.image?.[0]) formData.set("image", values.image[0]);

    startTransition(async () => {
      const result = await upsertProductAction(formData);

      if (result?.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result?.message || "Unable to save product.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
          {product?.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill sizes="180px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm font-bold text-zinc-400">
              Product image
            </div>
          )}
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-bold text-zinc-800">
              Name
              <input className={inputClass} {...register("name", { required: "Product name is required." })} />
              {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
            </label>
            <label className="text-sm font-bold text-zinc-800">
              Slug
              <input className={inputClass} placeholder="auto-from-name" {...register("slug")} />
            </label>
          </div>
          <label className="text-sm font-bold text-zinc-800">
            Description
            <textarea
              className="mt-1 min-h-24 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              {...register("description", {
                required: "Description is required.",
                minLength: { value: 20, message: "Description should be at least 20 characters." },
              })}
            />
            {errors.description ? <p className={errorClass}>{errors.description.message}</p> : null}
          </label>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-bold text-zinc-800">
          Upload image
          <input className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-zinc-950 file:px-3 file:py-1.5 file:text-sm file:font-black file:text-white" type="file" accept="image/png,image/jpeg,image/webp,image/gif" {...register("image")} />
          <p className="mt-1 text-xs font-semibold text-zinc-500">Uploading a new image deletes the previous uploaded image.</p>
        </label>
        <label className="text-sm font-bold text-zinc-800">
          External image URL
          <input className={inputClass} placeholder="Optional if uploading a file" {...register("imageUrl")} />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold text-zinc-800">
          Price
          <input
            className={inputClass}
            type="number"
            min="1"
            {...register("price", {
              required: "Price is required.",
              valueAsNumber: true,
              min: { value: 1, message: "Price must be greater than 0." },
            })}
          />
          {errors.price ? <p className={errorClass}>{errors.price.message}</p> : null}
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Compare at
          <input className={inputClass} type="number" min="0" {...register("compareAtPrice", { valueAsNumber: true })} />
        </label>
        <label className="text-sm font-bold text-zinc-800">
          Stock
          <input className={inputClass} type="number" min="0" {...register("stock", { valueAsNumber: true, min: 0 })} />
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm font-bold text-zinc-800">
          <input type="checkbox" className="h-4 w-4 accent-red-600" {...register("isActive")} />
          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="min-h-11 rounded-md bg-zinc-950 px-4 py-2 text-sm font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : product?.id ? "Save product" : "Create product"}
      </button>
    </form>
  );
}
