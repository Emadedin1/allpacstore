// src/app/cart/page.jsx

export default function CartPage() {
  const cartItems = [
    {
      name: "12 oz Custom Paper Cups",
      quantity: 2,
      price: 125,
    },
    {
      name: "16 oz White Paper Cups",
      quantity: 1,
      price: 120,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Item</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.quantity}</td>
                  <td className="p-3 border">${item.price}</td>
                  <td className="p-3 border">${item.quantity * item.price}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td colSpan={3} className="p-3 text-right border">
                  Grand Total
                </td>
                <td className="p-3 border">${total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
