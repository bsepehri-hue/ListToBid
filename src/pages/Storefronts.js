import React from "react";
import { COLORS } from "../components/Palette";
import ProductCard from "../components/ProductCard";

const containerStyle = {
  padding: "40px",
};

const headingStyle = {
  color: COLORS.primary,
  fontSize: "2rem",
  marginBottom: "20px",
};

export default function Storefronts() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Merchant Storefronts</h2>
      <p>
        This is where merchants will create and manage their storefronts.  
        Fee logic (5% flat, 3% card, 10% shipping handling) and referral hooks will be added here.
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Sample Sweater"
          price={65}
          merchant="Merchant A"
          stock={10}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Sample Sandals"
          price={85}
          merchant="Merchant B"
          stock={2}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Sample Watch"
          price={120}
          merchant="Merchant C"
          stock={0}
        />
      </div>
    </div>
  );
}