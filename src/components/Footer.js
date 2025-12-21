import React from "react";

export default function Footer() {
  return (
    <footer className="l2b-footer l2b-text-center l2b-py-4">
      <p className="l2b-text-sm l2b-text-muted-light">
        © {new Date().getFullYear()} ListToBid — Empowering the Underdog Economy
      </p>
    </footer>
  );
}