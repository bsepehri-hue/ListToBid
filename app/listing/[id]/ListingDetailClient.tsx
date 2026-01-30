"use client";

import { useState } from "react";
import { ShareModal } from "@/components/modals/ShareModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { RatingStars } from "@/components/common/RatingStars";
import ListingDetailClient from "./ListingDetailClient";

export function ListingDetailClient({ listing }: { listing: any }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  
  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">

      {/* Hero Image */}
      <div className="w-full h-72 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Title + Price */}
      <div>
        <h1 className="text-3xl font-semibold">{listing.title}</h1>
        <p className="text-2xl text-teal-700 font-bold mt-1">
          ${listing.price.toLocaleString()}
        </p>
      </div>

      {/* Rating */}
      {listing.rating && (
        <RatingStars rating={listing.rating} reviewCount={listing.reviewCount} />
      )}

      {/* Specs */}
      <div className="border p-4 rounded space-y-2">
        {listing.year && <p><strong>Year:</strong> {listing.year}</p>}
        {listing.make && <p><strong>Make:</strong> {listing.make}</p>}
        {listing.model && <p><strong>Model:</strong> {listing.model}</p>}
        {listing.condition && <p><strong>Condition:</strong> {listing.condition}</p>}
        {listing.mileage && (
          <p><strong>Mileage:</strong> {listing.mileage.toLocaleString()} miles</p>
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
      </div>

      {/* Location */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <p>{listing.location?.city}, {listing.location?.state}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setContactOpen(true)}
        >
          Contact Seller
        </button>

        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => setShareOpen(true)}
        >
          Share
        </button>
      </div>

      {/* Modals */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        storeName={listing.title}
        storeUrl={`https://listtobid.com/listing/${listing.id}`}
      />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        storeName={listing.title}
        storeId={listing.storefrontId}
      />
    </div>
  );
}
