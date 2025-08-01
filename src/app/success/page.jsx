export default function SuccessPage() {
  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-green-700">✅ Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Thanks for your order. We’ll start production shortly.
        </p>
        <p className="text-sm text-gray-500">
          You’ll receive an email confirmation. If you uploaded a design, our team will review it.
        </p>
      </div>
    </div>
  );
}
