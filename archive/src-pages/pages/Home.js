import React from "react";
import { COLORS } from "../components/Palette";

const containerStyle = {
  textAlign: "center",
  padding: "50px",
};

const headingStyle = {
  color: COLORS.primary,
  fontSize: "2.5rem",
  marginBottom: "20px",
};

const subheadingStyle = {
  color: COLORS.highlight,
  fontSize: "1.2rem",
  marginBottom: "30px",
};

const buttonStyle = {
  backgroundColor: COLORS.success,
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default function Home() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to ListToBid</h1>
      <p style={subheadingStyle}>
        Empowering merchants, creators, and underdogs through auctions and storefronts.
      </p>
      <button style={buttonStyle}>Explore Marketplace</button>
    </div>
  );
}