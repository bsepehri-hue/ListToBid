import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ image, title, price, merchant, stock }) {
  const { addToCart } = useContext(CartContext);

  const stockBadge =
    stock > 5 ? (
      <span className="l2b-badge l2b-badge-success">Verified Merchant</span>
    ) : stock > 0 ? (
      <span className="l2b-badge l2b-badge-warning">Low Stock</span>
    ) : (
      <span className="l2b-badge l2b-badge-alert">Out of Stock</span>
    );

  return (
    <div className="l2b-card l2b-flex-col l2b-gap-3">
      <img src={image} alt={title} className="l2b-card-image" />

      <h3 className="l2b-text-bold l2b-text-lg">{title}</h3>

      <p className="l2b-text-muted">{merchant}</p>

      <p className="l2b-price">${price}</p>

      {stockBadge}

      <button
        className="l2b-button l2b-button-primary"
        onClick={() => addToCart({ title, price })}
      >
        Add to Cart
      </button>
    </div>
  );
}