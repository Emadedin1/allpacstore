// =============================
// Fixes for Orders page + CSV export
// Paste these files exactly as-is.
// =============================

// File: src/app/admin/orders/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [data, setData] = useState({ orders: [], total: 0, page: 1, pages: 1 });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(""); // YYYY-MM-DD
  const [to, setTo] = useState("");     // YYYY-MM-DD
  const [loading, setLoading] = useState(true);

  async function load(page = 1) {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    params.set("page", String(page));
    params.set("limit", "20");
    const res = await fetch(`/api/admin/orders?${params.toString()}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  function exportCsv() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    window.location.href = `/api/admin/orders/export?${params.toString()}`;
  }

  function resetFilters() {
    setQ(""); setStatus(""); setFrom(""); setTo("");
    setTimeout(()=>load(1), 0);
  }

  useEffect(() => { load(1); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex gap-2">
          <button className="rounded-2xl px-4 py-2 border hover:shadow" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input className="border rounded px-3 py-2" placeholder="Search name, email, postal, design" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border rounded px-3 py-2" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="date" className="border rounded px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} />
        <span className="text-sm text-gray-500">to</span>
        <input type="date" className="border rounded px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="rounded-2xl px-4 py-2 border hover:shadow" onClick={()=>load(1)}>Filter</button>
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
            ) : data.orders.length === 0 ? (
              <tr><td className="p-3" colSpan={6}>No orders</td></tr>
            ) : data.orders.map(o => (
              <tr key={o._id} className="border-t">
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <div className="font-medium">{o.customer?.name || "-"}</div>
                  <div className="text-sm text-gray-500">{o.customer?.email || ""}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm">{o.items?.map(i => `${i.quantity}× ${i.size} ${i.designType === "custom" ? `(Custom: ${i.designName||""})` : "Plain"}`).join(", ")}</div>
                </td>
                <td className="p-3">{o.totals?.grandTotal?.toFixed(2)} {o.totals?.currency || "CAD"}</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded bg-gray-100">{o.status}</span>
                </td>
                <td className="p-3">
                  <Link className="underline" href={`/admin/orders/${o._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 items-center">
        <button disabled={data.page<=1} className="px-3 py-1 border rounded disabled:opacity-50" onClick={()=>load(data.page-1)}>Prev</button>
        <div>Page {data.page} / {data.pages}</div>
        <button disabled={data.page>=data.pages} className="px-3 py-1 border rounded disabled:opacity-50" onClick={()=>load(data.page+1)}>Next</button>
      </div>
    </div>
  );
}