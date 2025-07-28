import React from "react";

const bannerStyle = {
  width: "100%",
  backgroundColor: "#0070F3",
  color: "white",
  textAlign: "center",
  padding: "8px 0",
  fontWeight: 500,
  fontSize: "16px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
  letterSpacing: "0.5px",
};

export default function ShippingBanner() {
  return (
    <div style={bannerStyle}>
      Free Shipping for All Orders in Windsor, ON
    </div>
  );
}
