"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function StorefrontDetailPage() {
  const { storeId } = useParams();

  // Mock storefront data — replace with Firestore later
  const storefront = {
    id: storeId,
    name: "Bazaria Essentials",
    description: "Your go-to shop for curated essentials.",
    status: "active",
    listings: 12,
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {storefront.name}
          </h1>
          <p className="text-gray-600 mt-1">{storefront.description}</p>
        </div>

        <span
          className={`px-4 py-2 text-sm rounded-full ${
            storefront.status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {storefront.status}
        </span>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href={`/storefronts/${storeId}/edit`}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Edit Storefront
        </Link>

        <Link
          href={`/storefronts/${storeId}/listings/new`}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Add Listing
        </Link>
      </div>

      {/* Listings Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Listings
        </h2>

        <div className="bg-white p-8 rounded-xl border shadow text-center text-gray-500">
          No listings yet. Add your first one to get started.
        </div>
      </section>
    </div>
  );
}