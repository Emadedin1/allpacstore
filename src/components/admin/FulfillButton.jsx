"use client";
import { useState } from "react";

export default function FulfillButton({ id }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  async function mark() {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${id}/fulfill`, { method: "POST" });
    setLoading(false);
    if (res.ok) setDone(true);
  }
  return (
    <button disabled={loading||done} onClick={mark} className="rounded-2xl px-4 py-2 border hover:shadow disabled:opacity-50">
      {done ? "Fulfilled" : loading ? "Working…" : "Mark as fulfilled"}
    </button>
  );
}