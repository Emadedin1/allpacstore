"use client";
import dynamic from "next/dynamic";

// ✅ Dynamically import ContactClient only in the browser
const ContactClient = dynamic(() => import("./ContactClient"), { ssr: false });

export default function ContactWrapper() {
  return <ContactClient />;
}
