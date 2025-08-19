import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import FulfillButton from "@/components/admin/FulfillButton";

export default async function OrderDetail({ params }) {
  await dbConnect();
  const order = await Order.findById(params.id).lean();
  if (!order) return <div className="text-red-600">Order not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order #{String(order._id).slice(-6).toUpperCase()}</h1>
        {order.status !== "fulfilled" && <FulfillButton id={String(order._id)} />}
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-2xl p-4">
          <h2 className="font-semibold mb-3">Items</h2>
          <div className="divide-y">
            {order.items?.map((i, idx) => (
              <div key={idx} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{i.size} {i.name}</div>
                  <div className="text-sm text-gray-600">{i.quantity} × {i.unitPrice?.toFixed(2)} {i.currency || order.totals?.currency}</div>
                  <div className="text-sm">{i.designType === "custom" ? `Custom • ${i.designName || "Design"}` : "Plain White"}</div>
                  {i.designFileUrl && (<a className="text-sm underline" href={i.designFileUrl} target="_blank">View design</a>)}
                </div>
                <div className="text-right font-medium">{(i.subtotal || i.quantity * (i.unitPrice||0)).toFixed(2)} {i.currency || order.totals?.currency}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Customer</h2>
            <div>{order.customer?.name}</div>
            <div className="text-sm text-gray-600">{order.customer?.email}</div>
            <div className="text-sm text-gray-600">{order.customer?.phone}</div>
          </div>
          <div className="border rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Shipping</h2>
            <div className="text-sm">
              <div>{order.shippingAddress?.line1}</div>
              {order.shippingAddress?.line2 && <div>{order.shippingAddress.line2}</div>}
              <div>{order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}</div>
              <div>{order.shippingAddress?.country}</div>
            </div>
          </div>
          <div className="border rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Totals</h2>
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{order.totals?.itemsTotal?.toFixed(2)} {order.totals?.currency}</span></div>
            <div className="flex justify-between text-sm"><span>Tax</span><span>{order.totals?.tax?.toFixed(2)} {order.totals?.currency}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>{order.totals?.shipping?.toFixed(2)} {order.totals?.currency}</span></div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2"><span>Total</span><span>{order.totals?.grandTotal?.toFixed(2)} {order.totals?.currency}</span></div>
          </div>
        </div>
      </section>

      <section className="border rounded-2xl p-4">
        <h2 className="font-semibold mb-3">Timeline</h2>
        <ul className="space-y-2 text-sm">
          {order.timeline?.map((t, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{t.type}{t.note ? ` — ${t.note}` : ""}</span>
              <span className="text-gray-500">{new Date(t.at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}