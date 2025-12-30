"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function PropertiesIndexPage() {
  const [listings, setListings] = useState<any[]>([]);

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Properties for Sale</h1>

      {listings.length === 0 && <p>No properties listed yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((item) => (
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