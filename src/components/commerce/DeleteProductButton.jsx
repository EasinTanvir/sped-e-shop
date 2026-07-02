"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { deleteProductAction } from "@/app/actions";

export default function DeleteProductButton({ productId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    if (!window.confirm("Delete this product? Existing orders will keep their order record.")) return;

    const formData = new FormData();
    formData.set("id", productId);

    startTransition(async () => {
      const result = await deleteProductAction(formData);
      if (result?.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result?.message || "Unable to delete product.");
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={onDelete}
      className="rounded-md border border-red-200 px-4 py-2 text-sm font-black text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
