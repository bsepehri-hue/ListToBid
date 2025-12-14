import React from "react";
import { COLORS } from "../components/Palette";

const containerStyle = {
  padding: "40px",
};

const headingStyle = {
  color: COLORS.primary,
  fontSize: "2rem",
  marginBottom: "20px",
};

const cardStyle = {
  border: `1px solid ${COLORS.highlight}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "15px",
  backgroundColor: "#f9f9f9",
};

export default function Storefronts() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Merchant Storefronts</h2>
      <p>
        This is where merchants will create and manage their storefronts.  
        Fee logic (5% flat, 3% card, 10% shipping handling) and referral hooks will be added here.
      </p>

      {/* Example placeholder storefront cards */}
      <div style={cardStyle}>
        <h3>Storefront #1</h3>
        <p>Placeholder merchant details...</p>
      </div>
      <div style={cardStyle}>
        <h3>Storefront #2</h3>
        <p>Placeholder merchant details...</p>
      </div>
    </div>
  );
}