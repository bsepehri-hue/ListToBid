"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function TruckListingDetailPage() {
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
        <p><strong>Year:</strong> {listing.year}</p>
        <p><strong>Make:</strong> {listing.make}</p>
        <p><strong>Model:</strong> {listing.model}</p>
        <p><strong>Mileage:</strong> {listing.mileage?.toLocaleString()} miles</p>
        <p><strong>VIN:</strong> {listing.vin}</p>
        <p><strong>Odometer:</strong> {listing.odometer?.toLocaleString()} miles</p>
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