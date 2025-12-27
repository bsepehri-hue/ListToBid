import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div>
      <Navbar />
      <div className="product-grid">
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
      </div>
    </div>
  );
}

export default App;