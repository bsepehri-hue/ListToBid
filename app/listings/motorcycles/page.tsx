"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function MotorcyclesIndexPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      const ref = collection(db, "listings");
      const q = query(ref, where("category", "==", "motorcycles"));
      const snap = await getDocs(q);

      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setListings(items);
    };

    fetchListings();
  }, []);

  const filtered = listings.filter((item) => {
    const haystack = JSON.stringify(item).toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Motorcycles for Sale</h1>

      {/* Category Search */}
      <input
        className="w-full border p-2 rounded mb-6"
        placeholder="Search within Motorcycles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p>No matching motorcycles found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/listings/motorcycles/${item.id}`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-teal-700 font-medium">
              ${item.price?.toLocaleString()}
            </p>
            <p className="text-gray-600">
              {item.year} {item.make} {item.model}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}