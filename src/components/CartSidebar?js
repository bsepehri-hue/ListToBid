import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartSidebar.css";

export default function CartSidebar() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="cart-sidebar">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="subtotal">Subtotal: ${subtotal}</div>
      <button className="checkout-btn">Checkout</button>
    </aside>
  );
}