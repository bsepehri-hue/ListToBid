import React from "react";
import "./styles.css";

export default function ProductCard({ image, title, price, merchant, stock }) {
  const stockBadge =
    stock > 5 ? (
      <span className="badge success">Verified Merchant</span>
    ) : stock > 0 ? (
      <span className="badge warning">Low Stock</span>
    ) : (
      <span className="badge alert">Out of Stock</span>
    );

  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{merchant}</p>
      <p>${price}</p>
      {stockBadge}
      <button className="btn">Add to Cart</button>
    </div>
  );
}