"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderHistoryPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // Redirect to login if not logged in
    }
    // else, you can fetch orders here
  }, [router]);

  return (
    <div>
      <h1>Your Order History</h1>
      {/* Later: Show orders here */}
    </div>
  );
}
