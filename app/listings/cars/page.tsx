"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function CarsListingPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "listings"),
      where("category", "==", "cars")
    );

    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListings(items);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  // ⭐ Apply filters
  const filtered = listings.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.make?.toLowerCase().includes(search.toLowerCase()) ||
      item.model?.toLowerCase().includes(search.toLowerCase());

    const matchesMin = minPrice ? item.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? item.price <= Number(maxPrice) : true;
    const matchesYear = yearFilter ? item.year === yearFilter : true;

    return matchesSearch && matchesMin && matchesMax && matchesYear;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Cars for Sale</h1>

      {/* ⭐ FILTERS BLOCK — THIS IS THE CORRECT LOCATION ⭐ */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">

        <input
          placeholder="Search title, make, model"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          placeholder="Year"
          className="border p-2 rounded"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />

      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500">No car listings found.</p>
      )}

      {/* ⭐ LISTING GRID ⭐ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <a
            key={item.id}
            href={`/listings/cars/${item.id}`}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >