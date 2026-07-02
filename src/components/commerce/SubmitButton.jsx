"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Working..." : children}
    </button>
  );
}
