// src/app/checkout/page.jsx

export default function CheckoutPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form className="space-y-6">
        {/* Shipping Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Shipping Address"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <select className="w-full border p-2 rounded">
            <option value="">Select payment method</option>
            <option value="credit">Credit Card</option>
            <option value="e-transfer">E-Transfer</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>

        {/* Place Order */}
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Place Order
        </button>
      </form>
    </div>
  );
}
