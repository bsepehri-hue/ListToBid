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

export default function StorefrontSearchPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const loadListings = async () => {
      let ref = collection(db, "listings");

      // Base query: active listings for this store
      let q = query(
        ref,
        where("storeId", "==", storeId),
        where("status", "==", "active")
      );

      const snap = await getDocs(q);
      let items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      // Apply search filter
      if (search.trim() !== "") {
        const s = search.toLowerCase();
        items = items.filter(
          (l) =>
            l.title.toLowerCase().includes(s) ||
            l.description.toLowerCase().includes(s)
        );
      }

      // Apply category filter
      if (category !== "all") {
        items = items.filter((l) => l.category === category);
      }

      // Apply condition filter
      if (condition !== "all") {
        items = items.filter((l) => l.condition === condition);
      }

      // Apply sorting
      if (sort === "newest") {
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      } else if (sort === "price-low") {
        items.sort((a, b) => a.price - b.price);
      } else if (sort === "price-high") {
        items.sort((a, b) => b.price - a.price);
      }

      setListings(items);
      setLoading(false);
    };

    loadListings();
  }, [storeId, search, category, condition, sort]);

  if (loading) {
    return <p className="text-gray-600">Loading listings…</p>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Search Listings</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            placeholder="Search listings…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          />
        </div>

        {/* Category + Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="collectibles">Collectibles</option>
              <option value="home">Home & Living</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              <option value="all">All Conditions</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
              <option value="for-parts">For Parts</option>
            </select>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Results</h2>

        {listings.length === 0 ? (
          <p className="text-gray-600">No listings found.</p>
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
    </div>
  );
}