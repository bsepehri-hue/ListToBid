"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import StorefrontBadges from "@/components/StorefrontBadges";
import MessageButton from "@/components/MessageButton";

export default function PublicStorefrontPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [storefront, setStorefront] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Load storefront branding + info
      const ref = doc(db, "storefronts", storeId as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setStorefront(snap.data());
      }

      // Load listings
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("storeId", "==", storeId),
        where("status", "==", "active"),
        orderBy("createdAt", "desc")
      );

      const listingSnap = await getDocs(q);
      const items: any[] = [];

      listingSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setListings(items);
      setLoading(false);
    };

    loadData();
  }, [storeId]);

  if (loading) {
    return <p className="text-gray-600">Loading storefront…</p>;
  }

  if (!storefront) {
    return <p className="text-gray-600">Storefront not found.</p>;
  }

  return (
    <div className="space-y-10">

      {/* ⭐ Storefront Banner */}
      <div className="w-full h-48 bg-gray-200 relative">
        {storefront.bannerUrl && (
          <img
            src={storefront.bannerUrl}
            alt="Storefront Banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ⭐ Storefront Header */}
      <div className="px-4 md:px-8 -mt-12 flex items-center gap-4">
        {storefront.logoUrl ? (
          <img
            src={storefront.logoUrl}
            alt="Storefront Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow flex items-center justify-center text-gray-600">
            Logo
          </div>
        )}

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-gray-900">
            {storefront.name || "Storefront"}
          </h1>

          <StorefrontBadges storefront={storefront} />

          {storefront.description && (
            <p className="text-gray-700 mt-2 max-w-2xl">
              {storefront.description}
            </p>
          )}
        </div>
      </div>

      {/* ⭐ Message Merchant */}
      <MessageButton
        sellerId={storefront.ownerId}
        buyerId={null} // or your userId if available
        contextType="storefront"
        contextId={storeId}
        label="Message Merchant"
      />

      {/* ⭐ Listings */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Listings</h2>

        {listings.length === 0 ? (
          <p className="text-gray-600">No active listings.</p>
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
                {listing.imageUrls?.length > 0 ? (
                  <img
                    src={listing.imageUrls[0]}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900">
                  {listing.title}
                </h3>

                <p className="text-gray-800 font-medium">
                  ${listing.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}