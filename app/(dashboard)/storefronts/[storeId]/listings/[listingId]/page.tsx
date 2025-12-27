"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ListingDetailPage() {
  const { storeId, listingId } = useParams();
  const router = useRouter();

  // Mock listing — replace with Firestore later
  const listing = {
    id: listingId,
    title: "Vintage Leather Jacket",
    description: "A classic brown leather jacket in great condition.",
    price: 120,
    condition: "used",
    status: "active",
  };

  const handleDelete = () => {
    // Placeholder — replace with Firestore delete later
    console.log("Deleting listing:", listingId);

    // Redirect back to listings dashboard
    router.push(`/storefronts/${storeId}/listings`);
  };

  const handleToggleStatus = () => {
    // Placeholder — replace with Firestore update later
    console.log("Toggling status for:", listingId);

    // No redirect — just mock behavior
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {listing.title}
          </h1>
          <p className="text-gray-600 mt-1">${listing.price}</p>
        </div>

        <span
          className={`px-4 py-2 text-sm rounded-full ${
            listing.status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {listing.status}
        </span>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href={`/storefronts/${storeId}/listings/${listingId}/edit`}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Edit Listing
        </Link>

        <button
          onClick={handleToggleStatus}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          {listing.status === "active" ? "Pause Listing" : "Activate Listing"}
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete Listing
        </button>
      </div>

      {/* Details */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Details
        </h2>

        <div className="bg-white p-8 rounded-xl border shadow space-y-4">
          <p className="text-gray-700">{listing.description}</p>

          <p className="text-sm text-gray-500">
            Condition: <span className="font-medium">{listing.condition}</span>
          </p>

          <p className="text-sm text-gray-500">
            Listing ID: <span className="font-medium">{listing.id}</span>
          </p>
        </div>
      </section>
    </div>
  );
}