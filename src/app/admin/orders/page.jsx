"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const router = useRouter();

  // table data
  const [data, setData] = useState({ orders: [], total: 0, page: 1, pages: 1 });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(""); // YYYY-MM-DD
  const [to, setTo] = useState("");     // YYYY-MM-DD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // drawer state
  const [openId, setOpenId] = useState(null); // order id for side drawer
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const limit = 20;

  const buildParams = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    params.set("limit", String(limit));
    return params;
  };

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = buildParams();
      params.set("page", String(page));
      const res = await fetch(`/api/admin/orders?${params.toString()}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login?error=" + encodeURIComponent("Please log in"));
        return;
      }

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to fetch orders");
      setData({
        orders: Array.isArray(json?.orders) ? json.orders : [],
        total: Number(json?.total || 0),
        page: Number(json?.page || page),
        pages: Number(json?.pages || Math.max(1, Math.ceil((json?.total || 0) / limit))),
      });
    } catch (e) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [q, status, from, to, router]);

  useEffect(() => { load(1); }, [load]);

  const exportCsv = () => {
    const params = buildParams();
    window.location.href = `/api/admin/orders/export?${params.toString()}`;
  };

  const resetFilters = () => {
    setQ(""); setStatus(""); setFrom(""); setTo("");
    setTimeout(() => load(1), 0);
  };

  // --- Side drawer logic ---
  const openDrawer = async (id) => {
    setOpenId(id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { credentials: "include" });
      if (res.status === 401) {
        router.push("/admin/login?error=" + encodeURIComponent("Please log in"));
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to fetch order");
      setDetail(json);
    } catch (e) {
      setDetail({ error: e.message || "Failed to fetch order" });
    } finally {
      setDetailLoading(false);
    }
  };
  const closeDrawer = () => { setOpenId(null); setDetail(null); };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex gap-2">
          <button className="rounded-2xl px-4 py-2 border hover:shadow" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input className="border rounded px-3 py-2" placeholder="Search name, email, postal, design" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="date" className="border rounded px-3 py-2" value={from} onChange={e => setFrom(e.target.value)} />
        <span className="text-sm text-gray-500">to</span>
        <input type="date" className="border rounded px-3 py-2" value={to} onChange={e => setTo(e.target.value)} />
        <button className="rounded-2xl px-4 py-2 border hover:shadow" onClick={() => load(1)}>Filter</button>
        <button className="rounded-2xl px-4 py-2 border" onClick={resetFilters}>Reset</button>
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="min-w-[800px] w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Items</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={6}>Loading…</td></tr>
            ) : error ? (
              <tr><td className="p-3 text-red-600" colSpan={6}>{error}</td></tr>
            ) : data.orders.length === 0 ? (
              <tr><td className="p-3" colSpan={6}>No orders</td></tr>
            ) : data.orders.map(o => (
              <tr key={o._id} className="border-t">
                <td className="p-3">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</td>
                <td className="p-3">
                  <div className="font-medium">{o.customer?.name || "-"}</div>
                  <div className="text-sm text-gray-500">{o.customer?.email || ""}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm">{Array.isArray(o.items) ? o.items.map(i => `${i.quantity}× ${i.size} ${i.designType === "custom" ? `(Custom: ${i.designName || ""})` : "Plain"}`).join(", ") : "-"}</div>
                </td>
                <td className="p-3">{o.totals?.grandTotal?.toFixed?.(2) ?? o.total ?? "-"} {o.totals?.currency || "CAD"}</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded bg-gray-100">{o.status || "-"}</span>
                </td>
                <td className="p-3">
                  <button className="underline" onClick={() => openDrawer(o._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 items-center">
        <button disabled={data.page <= 1} className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => load(data.page - 1)}>Prev</button>
        <div>Page {data.page} / {data.pages}</div>
        <button disabled={data.page >= data.pages} className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => load(data.page + 1)}>Next</button>
      </div>

      {/* Slide-over Drawer (opens from the right side) */}
      {openId && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeDrawer}
            aria-hidden
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold truncate">Order Details</h2>
              <button onClick={closeDrawer} className="rounded px-2 py-1 border">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {detailLoading ? (
                <div>Loading…</div>
              ) : detail?.error ? (
                <div className="text-red-600">{detail.error}</div>
              ) : detail ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Order ID</div>
                    <div className="font-mono break-all">{detail._id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div>{detail.createdAt ? new Date(detail.createdAt).toLocaleString() : "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Customer</div>
                    <div>{detail.customer?.name || "-"}</div>
                    <div className="text-sm text-gray-500">{detail.customer?.email || ""}</div>
                    {detail.shipping?.address && (
                      <div className="text-sm text-gray-500 whitespace-pre-line">
                        {`${detail.shipping.address}\n${detail.shipping.city || ""} ${detail.shipping.postal || ""}`}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Items</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.isArray(detail.items) && detail.items.map((i, idx) => (
                        <li key={idx}>
                          {i.quantity}× {i.size} {i.designType === "custom" ? `(Custom: ${i.designName || ""})` : "Plain"}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Totals</div>
                    <div>
                      {detail.totals?.grandTotal?.toFixed?.(2) ?? detail.total ?? "-"} {detail.totals?.currency || "CAD"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div>{detail.status || "-"}</div>
                  </div>
                </div>
              ) : (
                <div>No data</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
