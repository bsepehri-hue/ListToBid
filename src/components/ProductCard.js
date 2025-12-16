// src/components/ProductCard.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ image, title, price, merchant, stock }) {
  const { addToCart } = useContext(CartContext);

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
      <button className="btn" onClick={() => addToCart({ title, price })}>
        Add to Cart
      </button>
    </div>
  );
}