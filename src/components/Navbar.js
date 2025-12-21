import React from "react";

export default function Navbar() {
  return (
    <nav className="l2b-header l2b-flex-between l2b-px-4 l2b-py-3">
      <div className="l2b-text-bold l2b-text-white">ListToBid</div>

      <div className="l2b-flex l2b-gap-4">
        <a href="/" className="l2b-header-link">Home</a>
        <a href="/storefronts" className="l2b-header-link">Storefronts</a>
        <a href="/auctions" className="l2b-header-link">Auctions</a>
        <a href="/admin" className="l2b-header-link">Admin</a>
      </div>
    </nav>
  );
}