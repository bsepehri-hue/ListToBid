import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { COLORS } from "./Palette";

const layoutStyle = {
  backgroundColor: COLORS.primary,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

export default function Layout({ children }) {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}