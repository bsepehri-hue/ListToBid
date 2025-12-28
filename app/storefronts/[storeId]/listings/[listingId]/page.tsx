"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PublicListingDetailPage() {
  const { storeId, listingId } = useParams();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const loadListing = async () => {
      const ref = doc(db, "listings", listingId as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setListing(data);

        if (data.imageUrls && data.imageUrls.length > 0) {
          setActiveImage(data.imageUrls[0]);
        }
      }

      setLoading(false);
    };

    loadListing();
  }, [listingId]);

  if (loading) {
    return <p className="text-gray-600">Loading listing…</p>;
  }

  if (!listing) {
    return <p className="text-gray-600">Listing not found.</p>;
  }

  return (
    <div className="space-y-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>

      {/* Main Image */}
      {activeImage && (
        <img
          src={activeImage}
          className="w-full max-w-xl rounded-xl border object-cover"
        />
      )}

      {/* Thumbnail Strip */}
      {listing.imageUrls && listing.imageUrls.length > 1 && (
        <div className="flex gap-3 mt-4">
          {listing.imageUrls.map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              onClick={() => setActiveImage(url)}
              className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                activeImage === url ? "ring-2 ring-teal-600" : ""
              }`}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <div className="space-y-4">
        <p className="text-lg text-gray-700">{listing.description}</p>

        <p className="text-2xl font-semibold text-gray-900">
          ${listing.price}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Condition:</span> {listing.condition}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Category:</span> {listing.category}
        </p>
      </div>

      {/* Contact Seller (future) */}
      <div className="pt-6">
        <button
          disabled
          className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
        >
          Contact Seller (coming soon)
        </button>
      </div>
    </div>
  );
}