import Link from "next/link";

export const metadata = { title: "Admin • Allpac" };

export default function AdminLayout({ children }) {
  const nav = [
    { href: "/admin/orders", label: "Orders" },
    // { href: "/admin/products", label: "Products" }, // removed per request
    { href: "/admin/settings", label: "Settings" },
  ];
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-2">
        <div className="font-semibold text-lg mb-4">Allpac Admin</div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="px-3 py-2 rounded hover:bg-gray-100">{n.label}</Link>
          ))}
        </nav>
      </aside>
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}