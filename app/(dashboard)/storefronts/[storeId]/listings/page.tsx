"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ListingsDashboardPage() {
  const { storeId } = useParams();

  // Mock listings — replace with Firestore later
  const listings = [
    {
      id: "101",
      title: "Vintage Leather Jacket",
      price: 120,
      status: "active",
      condition: "used",
    },
    {
      id: "102",
      title: "Wireless Headphones",
      price: 45,
      status: "paused",
      condition: "like-new",
    },
  ];

  const hasListings = listings.length > 0;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Listings</h1>

        <Link
          href={`/storefronts/${storeId}/listings/new`}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Add Listing
        </Link>
      </div>

      {/* Listings */}
      {!hasListings ? (
        <div className="bg-white p-12 rounded-xl border shadow text-center text-gray-500">
          No listings yet. Add your first one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    item.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-gray-600 mt-1">${item.price}</p>
              <p className="text-sm text-gray-500">Condition: {item.condition}</p>

              <Link
                href={`/storefronts/${storeId}/listings/${item.id}`}
                className="mt-4 inline-block text-teal-600 hover:text-teal-800 font-medium text-sm"
              >
                Manage Listing →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}