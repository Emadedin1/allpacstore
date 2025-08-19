import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "../../_utils";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvEscape(val) {
    if (val === null || val === undefined) return "";
    const s = String(val)
        .replaceAll('', ' ')
        .replaceAll('', ' ')
        .replaceAll('', ' ');
    if (/[",]/.test(s)) return '"' + s.replaceAll('"', '""') + '"';
    return s;
}

export async function GET(req) {
    if (!requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status");
    const from = searchParams.get("from"); // YYYY-MM-DD
    const to = searchParams.get("to");     // YYYY-MM-DD

    const filter = {};
    if (status) filter.status = status;
    if (q) {
        filter.$or = [
            { "customer.name": { $regex: q, $options: "i" } },
            { "customer.email": { $regex: q, $options: "i" } },
            { "shippingAddress.postalCode": { $regex: q, $options: "i" } },
            { "items.designName": { $regex: q, $options: "i" } },
            { stripeSessionId: { $regex: q, $options: "i" } },
        ];
    }
    if (from || to) {
        filter.createdAt = {};
        if (from) filter.createdAt.$gte = new Date(`${from}T00:00:00.000Z`);
        if (to) filter.createdAt.$lte = new Date(`${to}T23:59:59.999Z`);
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

    const header = [
        "OrderID", "CreatedAt", "Status", "Payment",
        "CustomerName", "CustomerEmail", "CustomerPhone",
        "ShippingLine1", "City", "Province", "Postal", "Country",
        "LineItems", "ItemsTotal", "Tax", "Shipping", "GrandTotal", "Currency"
    ];

    const rows = orders.map(o => {
        const lineItems = (o.items || [])
            .map(i => `${i.quantity}x ${i.size || ""} ${i.name || ""} ${i.designType === 'custom' ? `(Custom: ${i.designName || ''})` : 'Plain'}`)
            .join(" | ");
        return [
            o._id,
            new Date(o.createdAt).toISOString(),
            o.status,
            o.paymentStatus,
            o.customer?.name || "",
            o.customer?.email || "",
            o.customer?.phone || "",
            o.shippingAddress?.line1 || "",
            o.shippingAddress?.city || "",
            o.shippingAddress?.province || "",
            o.shippingAddress?.postalCode || "",
            o.shippingAddress?.country || "",
            lineItems,
            o.totals?.itemsTotal ?? "",
            o.totals?.tax ?? "",
            o.totals?.shipping ?? "",
            o.totals?.grandTotal ?? "",
            o.totals?.currency || "CAD",
        ].map(csvEscape).join(",");
    });

    const csv = [header.join(","), ...rows].join("");
    return new NextResponse(csv, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename=orders_${Date.now()}.csv`,
            "Cache-Control": "no-store",
        },
    });
}