"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CarListingDetailPage({ params }: any) {
  const { id } = params;

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const ref = doc(db, "listings", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setListing(snap.data());
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  if (!listing) {
    return <div className="p-6">Listing not found.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>

      <div className="text-gray-600">
        <p><strong>Price:</strong> ${listing.price}</p>
        <p><strong>Year:</strong> {listing.year}</p>
        <p><strong>Make:</strong> {listing.make}</p>
        <p><strong>Model:</strong> {listing.model}</p>
        <p><strong>Mileage:</strong> {listing.mileage}</p>
        <p><strong>Condition:</strong> {listing.condition}</p>
        <p><strong>Location:</strong> {listing.location}</p>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {listing.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}