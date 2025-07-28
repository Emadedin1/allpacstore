// src/app/contact/page.jsx

export default function ContactPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="w-full border border-gray-300 p-2 rounded h-32"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
