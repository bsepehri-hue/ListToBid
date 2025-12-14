import React from "react";
import { COLORS } from "./Palette";

const footerStyle = {
  backgroundColor: COLORS.primary,
  color: "#fff",
  padding: "15px 20px",
  textAlign: "center",
  marginTop: "auto",
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} ListToBid — Empowering the Underdog Economy</p>
    </footer>
  );
}