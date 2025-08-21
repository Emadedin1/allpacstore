// File: src/app/success/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const calledRef = useRef(false);

  const [status, setStatus] = useState("idle"); // idle | confirming | success | error
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId || calledRef.current) return;
    calledRef.current = true;

    const confirm = async () => {
      try {
        setStatus("confirming");
        setMessage("Confirming your payment…");

        const res = await fetch(`/api/orders/confirm?session_id=${encodeURIComponent(sessionId)}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data?.error || "Could not confirm order");
        }

        setStatus("success");
        setOrderId(data?.order?._id || null);
        setMessage("Payment confirmed! Your order has been recorded.");

        // Optional: auto-redirect to Order History after a short delay
        const t = setTimeout(() => {
          router.replace("/order-history");
        }, 2000);
        return () => clearTimeout(t);
      } catch (err) {
        console.error("/success confirm error", err);
        setStatus("error");
        setMessage(err.message || "Something went wrong confirming your order.");
      }
    };

    confirm();
  }, [sessionId, router]);

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-3">Thanks!</h1>
        <p className="mb-6">We couldn't find a Stripe session id in the URL.</p>
        <div className="flex gap-3 justify-center">
          <a href="/" className="px-4 py-2 border rounded">Home</a>
          <a href="/order-history" className="px-4 py-2 border rounded">Order History</a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <h1 className="text-2xl font-bold mb-3">Checkout Complete</h1>

      {status === "confirming" && (
        <div className="animate-pulse text-gray-700">{message || "Confirming…"}</div>
      )}

      {status === "success" && (
        <>
          <p className="text-green-700 mb-4">{message}</p>
          {orderId && (
            <p className="text-sm text-gray-600 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>
          )}
          <div className="flex gap-3 justify-center">
            <a href="/order-history" className="px-4 py-2 border rounded">View Order History</a>
            <a href="/" className="px-4 py-2 border rounded">Home</a>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-600 mb-4">{message || "Could not confirm the order."}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.refresh()} className="px-4 py-2 border rounded">Try Again</button>
            <a href={`/api/orders/confirm?session_id=${encodeURIComponent(sessionId)}`} className="px-4 py-2 border rounded" target="_blank" rel="noreferrer">
              Open Confirm API
            </a>
          </div>
        </>
      )}
    </div>
  );
}
