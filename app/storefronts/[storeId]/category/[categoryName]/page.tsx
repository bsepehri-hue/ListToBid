"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StorefrontCategoryPage() {
  const { storeId, categoryName } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const loadListings = async () => {
      const ref = collection(db, "listings");

      const q = query(
        ref,
        where("storeId", "==", storeId),
        where("status", "==", "active"),
        where("category", "==", categoryName),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setListings(items);
      setLoading(false);
    };

    loadListings();
  }, [storeId, categoryName]);

  if (loading) {
    return <p className="text-gray-600">Loading category…</p>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 capitalize">
        {categoryName.replace("-", " ")}
      </h1>

      {/* Listings */}
      {listings.length === 0 ? (
        <p className="text-gray-600">No listings in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white border rounded-xl shadow p-4 space-y-4 cursor-pointer"
              onClick={() =>
                router.push(`/storefronts/${storeId}/listings/${listing.id}`)
              }
            >
              {/* Thumbnail */}
              {listing.imageUrls && listing.imageUrls.length > 0 ? (
                <img
                  src={listing.imageUrls[0]}
                  className="w-full h-40 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {listing.title}
              </h3>

              {/* Price */}
              <p className="text-gray-800 font-medium">${listing.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}