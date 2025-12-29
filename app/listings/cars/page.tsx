"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function CarsListingPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Cars for Sale</h1>

      {listings.length === 0 && (
        <p className="text-gray-500">No car listings yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <a
            key={item.id}
            href={`/listings/cars/${item.id}`}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-medium">{item.title}</h2>

            <p className="text-gray-600 mt-1">
              ${item.price?.toLocaleString()}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {item.year} • {item.make} • {item.model}
            </p>

            <p className="text-gray-400 text-xs mt-2">
              {item.location}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}