import React from "react";
import Link from "next/link";

export default function StorefrontCard({ name, owner, storeId }) {
  return (
    <Link href={`/dashboard/storefront/${storeId}`}>
      <div className="l2b-card l2b-flex-col l2b-gap-3 l2b-cursor-pointer">
        <h3 className="l2b-text-bold l2b-text-lg">{name}</h3>

        <p className="l2b-text-muted">Owner: {owner}</p>

        <button className="l2b-button l2b-button-primary l2b-w-full l2b-text-center">
          View Dashboard →
        </button>
      </div>
    </Link>
  );
}