"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function PropertyListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      const ref = doc(db, "listings", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) setListing(snap.data());
    };
    fetchListing();
  }, [id]);

  if (!listing) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      {/* Title + Price */}
      <div>
        <h1 className="text-3xl font-semibold">{listing.title}</h1>
        <p className="text-xl text-teal-700 font-medium mt-1">
          ${listing.price?.toLocaleString()}
        </p>
      </div>

      {/* Specs */}
      <div className="border p-4 rounded space-y-2">
        <p><strong>Type:</strong> {listing.type}</p>
        <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
        <p><strong>Square Footage:</strong> {listing.sqft?.toLocaleString()} sqft</p>

        {listing.lotSize && (
          <p><strong>Lot Size:</strong> {listing.lotSize?.toLocaleString()} sqft</p>
        )}

        {listing.yearBuilt && (
          <p><strong>Year Built:</strong> {listing.yearBuilt}</p>
        )}

        <p><strong>Condition:</strong> {listing.condition}</p>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
      </div>

      {/* Location */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <p>{listing.location}</p>
      </div>

      {/* Contact Seller */}
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Contact Seller
      </button>

    </div>
  );
}