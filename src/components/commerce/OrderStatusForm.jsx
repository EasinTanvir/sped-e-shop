"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateOrderStatusAction } from "@/app/actions";
import { orderStatusLabel } from "@/lib/data";

const statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderStatusForm({ order }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm({ defaultValues: { status: order.status } });

  function onSubmit(values) {
    const formData = new FormData();
    formData.set("id", order.id);
    formData.set("status", values.status);

    startTransition(async () => {
      const result = await updateOrderStatusAction(formData);
      if (result?.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result?.message || "Unable to update status.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <select {...register("status", { required: true })} className="h-10 flex-1 rounded-md border border-zinc-300 bg-white px-2 text-sm capitalize outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100">
        {statuses.map((status) => (
          <option key={status} value={status}>
            {orderStatusLabel(status)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
