import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";   // ✅ import the cart
import { COLORS } from "./Palette";

const layoutStyle = {
  backgroundColor: COLORS.primary,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const contentWrapperStyle = {
  flex: 1,
  display: "flex",              // ✅ allow main + sidebar side by side
  backgroundColor: "#fff",
};

const mainStyle = {
  flex: 1,
  padding: "20px",
};

export default function Layout({ children }) {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <div style={contentWrapperStyle}>
        <main style={mainStyle}>{children}</main>
        <CartSidebar />          {/* ✅ cart always visible on the right */}
      </div>
      <Footer />
    </div>
  );
}
