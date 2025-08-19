"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // adjust alias if needed

// Map sizes to slugs you use in /products/[slug]
const SIZE_TO_SLUG = {
  "10 oz": "10oz-hot-cup",
  "12 oz": "12oz-hot-cup",
  "16 oz": "16oz-hot-cup",
  "22 oz": "22oz-cold-cup",
  "32 oz": "32oz-cold-cup",
};

export default function OrderHistoryPage() {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const limit = 20;

  const load = async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders?mine=1&page=${p}&limit=${limit}`, {
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/login?error=" + encodeURIComponent("Please log in to view your orders"));
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to load orders");
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
      setPages(Number(data?.pages || 1));
    } catch (e) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); /* eslint-disable-next-line */ }, [page]);

  const reorder = (order) => {
    try {
      (order.items || []).forEach((it) => {
        const isCustom = String(it.designType || "").toLowerCase() === "custom";
        const slug = SIZE_TO_SLUG[it.size] || "paper-cup"; // fallback slug if needed
        const qtyCups = Number(it.quantity || 0) || 1000; // fallback 1 case = 1000 cups
        const unit = Number(it.unitPrice || 0) || undefined; // per-cup price if available

        // Minimal product stub for CartContext
        const productStub = {
          slug,
          size: it.size,
          image: "", // optional; keep empty if unknown
          priceCase: unit ? unit * 1000 : undefined,
          qtyCase: 1000,
        };

        const uploadedDesign = isCustom && it.designName
          ? { name: it.designName }
          : null;

        addItem(
          productStub,
          qtyCups,
          uploadedDesign,
          "", // previewURL
          isCustom ? "Custom" : "Plain White",
          unit
        );
      });
      openCart();
    } catch (e) {
      console.error("reorder error", e);
      alert("Could not add items to cart.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : orders.length === 0 ? (
        <div>You have no orders yet.</div>
      ) : (
        <div className="overflow-x-auto border rounded-2xl">
          <table className="min-w-[920px] w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</td>
                  <td className="p-3">
                    <div className="text-sm truncate max-w-[520px]">
                      {Array.isArray(o.items)
                        ? o.items
                            .map((i) =>
                              `${i.quantity}× ${i.size} ${String(i.designType).toLowerCase() === "custom" ? `(Custom: ${i.designName || ""})` : "Plain"}`
                            )
                            .join(", ")
                        : "-"}
                    </div>
                  </td>
                  <td className="p-3">{o.totals?.grandTotal?.toFixed?.(2) ?? o.total ?? "-"} {o.totals?.currency || "CAD"}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-sm rounded bg-gray-100">{o.status || "-"}</span>
                  </td>
                  <td className="p-3">
                    <button
                      className="rounded px-3 py-1 border hover:shadow"
                      onClick={() => reorder(o)}
                    >
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <button
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <div>
          Page {page} / {pages}
        </div>
        <button
          disabled={page >= pages}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}