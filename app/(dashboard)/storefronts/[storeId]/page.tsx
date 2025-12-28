"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StorefrontDashboardPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const loadListings = async () => {
      const ref = collection(db, "listings");
      const q = query(
        ref,
        where("storeId", "==", storeId),
        orderBy("createdAt", "desc"),
        limit(6) // show recent 6 listings
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
  }, [storeId]);

  if (loading) {
    return <p className="text-gray-600">Loading storefront…</p>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Storefront Overview</h1>

        <button
          onClick={() => router.push(`/storefronts/${storeId}/listings/new`)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Add Listing
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm">Total Listings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{listings.length}</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm">Active Listings</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {listings.filter((l) => l.status === "active").length}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm">Inactive Listings</p>
          <p className="text-3xl font-bold text-gray-700 mt-2">
            {listings.filter((l) => l.status !== "active").length}
          </p>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Listings</h2>

        {listings.length === 0 ? (
          <p className="text-gray-600">No listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border rounded-xl shadow p-4 space-y-4"
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

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      router.push(`/storefronts/${storeId}/listings/${listing.id}`)
                    }
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/storefronts/${storeId}/listings/${listing.id}/edit`)
                    }
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All */}
      <div className="pt-4">
        <button
          onClick={() => router.push(`/storefronts/${storeId}/listings`)}
          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
        >
          View All Listings
        </button>
      </div>
    </div>
  );
}