import React from "react";

export default function StoreCard({ name, owner, logo, description, storeId }) {
  return (
    <div className="l2b-card l2b-flex-col l2b-gap-3">
      <img src={logo} alt={name} className="l2b-card-image" />

      <h3 className="l2b-text-bold l2b-text-lg">{name}</h3>

      <p className="l2b-text-muted">Owner: {owner}</p>

      <p className="l2b-text-sm">{description}</p>

      <a
        href={`/store/${storeId}`}
        className="l2b-button l2b-button-primary l2b-w-full l2b-text-center"
      >
        Visit Store
      </a>
    </div>
  );
}