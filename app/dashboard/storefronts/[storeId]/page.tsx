"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardStorefrontHome() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);
  const [listingCount, setListingCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      // Load storefront info
      const ref = doc(db, "storefronts", storeId as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setStore({ id: snap.id, ...snap.data() });
      }

      // Load active listings count
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("storeId", "==", storeId),
        where("deleted", "==", false)
      );

      const listingSnap = await getDocs(q);
      setListingCount(listingSnap.size);

      setLoading(false);
    };

    load();
  }, [storeId]);

  if (loading) {
    return <p className="text-gray-600">Loading storefront…</p>;
  }

  if (!store) {
    return <p className="text-gray-600">Storefront not found.</p>;
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
        <p className="text-gray-700">{store.description || "No description provided."}</p>

        <div className="flex gap-6 text-gray-600 text-sm">
          <p>Store ID: {store.id}</p>
          <p>Active Listings: {listingCount}</p>
        </div>
      </div>

      {/* Banner Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Banner Preview</h2>
        {store.banner ? (
          <img
            src={store.banner}
            className="w-full h-40 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 border">
            No Banner
          </div>
        )}
      </div>

      {/* Logo Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Logo Preview</h2>
        {store.logo ? (
          <img
            src={store.logo}
            className="w-28 h-28 rounded-full border object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 border flex items-center justify-center text-gray-600">
            No Logo
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => router.push(`/dashboard/storefronts/${storeId}/listings`)}
          className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-800 font-medium"
        >
          Manage Listings
        </button>

        <button
          onClick={() => router.push(`/dashboard/storefronts/${storeId}/settings`)}
          className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Edit Storefront
        </button>

        <button
          onClick={() => router.push(`/storefronts/${storeId}`)}
          className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-gray-800 font-medium"
        >
          View Public Storefront
        </button>
      </div>
    </div>
  );
}