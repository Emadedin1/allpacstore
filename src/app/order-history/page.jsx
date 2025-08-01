"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const styles = {
  wrapper: {
    maxWidth: 900,
    margin: "40px auto",
    padding: "32px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: 14,
    color: "#222",
    textAlign: "center",
  },
  desc: {
    marginBottom: 32,
    color: "#666",
    textAlign: "center",
    fontSize: "1.08rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
  },
  th: {
    background: "#f4f7fa",
    color: "#222",
    padding: "14px 10px",
    fontWeight: 600,
    borderBottom: "2px solid #e2e8f0",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #f2f2f2",
    transition: "background 0.2s",
  },
  td: {
    padding: "14px 10px",
    fontSize: "1.01rem",
    color: "#444",
    verticalAlign: "top",
  },
  status: {
    padding: "5px 14px",
    borderRadius: "16px",
    fontWeight: 600,
    display: "inline-block",
  },
  statusPaid: {
    background: "#e7f9ed",
    color: "#1a9850",
  },
  statusPending: {
    background: "#fff4e5",
    color: "#e65c00",
  },
  statusCancelled: {
    background: "#ffe3e3",
    color: "#d7263d",
  },
  empty: {
    padding: "40px",
    color: "#bbb",
    textAlign: "center",
    fontSize: "1.1rem",
    fontStyle: "italic",
  },
  ordersContainer: {
    overflowX: "auto",
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getStatusStyle(status) {
  if (status === "Paid") return { ...styles.status, ...styles.statusPaid };
  if (status === "Pending") return { ...styles.status, ...styles.statusPending };
  if (status === "Cancelled") return { ...styles.status, ...styles.statusCancelled };
  return styles.status;
}

// MOCK DATA - replace with API call!
const MOCK_ORDERS = [
  {
    id: "O123456",
    date: "2025-07-13T15:30:00Z",
    total: 89.99,
    status: "Paid",
    items: [
      { name: "Wireless Headphones", qty: 1, price: 59.99 },
      { name: "USB-C Cable", qty: 2, price: 15 },
    ],
  },
  {
    id: "O123457",
    date: "2025-06-28T18:00:00Z",
    total: 24.99,
    status: "Pending",
    items: [
      { name: "Bluetooth Mouse", qty: 1, price: 24.99 },
    ],
  },
  {
    id: "O123458",
    date: "2025-05-12T12:20:00Z",
    total: 39.90,
    status: "Cancelled",
    items: [
      { name: "Desk Lamp", qty: 2, price: 19.95 },
    ],
  },
];

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      // TODO: Replace with real API call!
      setTimeout(() => {
        setOrders(MOCK_ORDERS);
      }, 500);
      // Example for real API:
      // fetch("/api/orders", { headers: { Authorization: "Bearer " + token } })
      //   .then(res => res.json())
      //   .then(data => setOrders(data.orders))
      //   .catch(() => setOrders([]));
    }
  }, [router]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>Order History</div>
      <div style={styles.desc}>
        Here you can review your past and current orders.
      </div>
      <div style={styles.ordersContainer}>
        {!orders ? (
          <div style={styles.empty}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={styles.empty}>You have not placed any orders yet.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order #</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Items</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={styles.tr}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{formatDate(order.date)}</td>
                  <td style={styles.td}>
                    <ul style={{ paddingLeft: 17, margin: 0 }}>
                      {order.items.map((item, i) => (
                        <li key={i}>
                          <span style={{ fontWeight: 500 }}>{item.name}</span>
                          {" × "}{item.qty}
                          <span style={{ color: "#aaa", fontSize: "0.94em" }}>
                            {" "}- ${item.price.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(order.status)}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
