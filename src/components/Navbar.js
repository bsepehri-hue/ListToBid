import React from "react";
import { COLORS } from "./Palette";

const navStyle = {
  backgroundColor: COLORS.primary,
  color: "#fff",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 10px",
};

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: "bold" }}>ListToBid</div>
      <div>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/storefronts" style={linkStyle}>Storefronts</a>
        <a href="/auctions" style={linkStyle}>Auctions</a>
        <a href="/admin" style={linkStyle}>Admin</a>
      </div>
    </nav>
  );
}