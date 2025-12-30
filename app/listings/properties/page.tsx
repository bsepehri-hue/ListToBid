"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function PropertiesIndexPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");
  const [maxBaths, setMaxBaths] = useState("");
  const [minSqft, setMinSqft] = useState("");
  const [maxSqft, setMaxSqft] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      const ref = collection(db, "listings");
      const q = query(ref, where("category", "==", "properties"));
      const snap = await getDocs(q);

      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setListings(items);
    };

    fetchListings();
  }, []);

  const filtered = listings.filter((item) => {
    const haystack = JSON.stringify(item).toLowerCase();
    const q = search.toLowerCase();

    // Text search
    if (!haystack.includes(q)) return false;

    // Price filter
    if (minPrice && item.price < Number(minPrice)) return false;
    if (maxPrice && item.price > Number(maxPrice)) return false;

    // Type filter
    if (type && item.type?.toLowerCase() !== type.toLowerCase()) return false;

    // Bedrooms filter
    if (minBeds && item.bedrooms < Number(minBeds)) return false;
    if (maxBeds && item.bedrooms > Number(maxBeds)) return false;

    // Bathrooms filter
    if (minBaths && item.bathrooms < Number(minBaths)) return false;
    if (maxBaths && item.bathrooms > Number(maxBaths)) return false;

    // Square footage filter
    if (minSqft && item.sqft < Number(minSqft)) return false;
    if (maxSqft && item.sqft > Number(maxSqft)) return false;

    return true;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Properties for Sale</h1>

      {/* Search */}
      <input
        className="w-full border p-2 rounded mb-6"
        placeholder="Search within Properties..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Min Beds"
          value={minBeds}
          onChange={(e) => setMinBeds(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Max Beds"
          value={maxBeds}
          onChange={(e) => setMaxBeds(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Min Baths"
          value={minBaths}
          onChange={(e) => setMinBaths(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Max Baths"
          value={maxBaths}
          onChange={(e) => setMaxBaths(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Min Sqft"
          value={minSqft}
          onChange={(e) => setMinSqft(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Max Sqft"
          value={maxSqft}
          onChange={(e) => setMaxSqft(e.target.value)}
        />
      </div>

      {filtered.length === 0 && <p>No matching properties found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/listings/properties/${item.id}`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>

            <p className="text-teal-700 font-medium">
              ${item.price?.toLocaleString()}
            </p>

            <p className="text-gray-600 capitalize">
              {item.type} • {item.bedrooms} bd • {item.bathrooms} ba
            </p>

            <p className="text-gray-600">
              {item.sqft?.toLocaleString()} sqft
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}