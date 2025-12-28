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
import RVFilters from "@/components/RVFilters";

export default function RVSearchPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [allListings, setAllListings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    const loadListings = async () => {
      const ref = collection(db, "listings");

      const q = query(
        ref,
        where("storeId", "==", storeId),
        where("status", "==", "active"),
        where("category", "==", "rvs"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const items: any[] = [];

      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setAllListings(items);
      setFiltered(items);
      setLoading(false);
    };

    loadListings();
  }, [storeId]);

  const applyFilters = (filters: any) => {
    let results = [...allListings];

    // RV Type
    if (filters.type !== "all") {
      results = results.filter((l) => l.rvType === filters.type);
    }

    // Sleeps
    if (filters.sleeps !== "all") {
      const [min, max] = filters.sleeps === "7+" ? [7, 99] : filters.sleeps.split("-").map(Number);
      results = results.filter((l) => l.sleeps >= min && l.sleeps <= max);
    }

    // Length
    if (filters.length !== "all") {
      if (filters.length === "36+") {
        results = results.filter((l) => l.length >= 36);
      } else {
        const [min, max] = filters.length.split("-").map(Number);
        results = results.filter((l) => l.length >= min && l.length <= max);
      }
    }

    // Weight
    if (filters.weight !== "all") {
      if (filters.weight === "10000+") {
        results = results.filter((l) => l.weight >= 10000);
      } else {
        const [min, max] = filters.weight.split("-").map((v) => Number(v.replace("under-", "")));
        if (filters.weight.startsWith("under")) {
          results = results.filter((l) => l.weight <= min);
        } else {
          results = results.filter((l) => l.weight >= min && l.weight <= max);
        }
      }
    }

    // Towable vs Motorized
    if (filters.towable !== "all") {
      results = results.filter((l) => l.rvDrive === filters.towable);
    }

    // Price
    if (filters.price !== "all") {
      if (filters.price === "100000+") {
        results = results.filter((l) => l.price >= 100000);
      } else if (filters.price.startsWith("under")) {
        const max = Number(filters.price.replace("under-", ""));
        results = results.filter((l) => l.price <= max);
      } else {
        const [min, max] = filters.price.split("-").map(Number);
        results = results.filter((l) => l.price >= min && l.price <= max);
      }
    }

    // Slide-outs
    if (filters.slideouts !== "all") {
      if (filters.slideouts === "3+") {
        results = results.filter((l) => l.slideouts >= 3);
      } else {
        results = results.filter((l) => l.slideouts === Number(filters.slideouts));
      }
    }

    // Fuel Type
    if (filters.fuel !== "all") {
      results = results.filter((l) => l.fuel === filters.fuel);
    }

    // Year
    if (filters.year !== "all") {
      const minYear = Number(filters.year.replace("+", ""));
      results = results.filter((l) => l.year >= minYear);
    }

    // Mileage
    if (filters.mileage !== "all") {
      if (filters.mileage === "100k+") {
        results = results.filter((l) => l.mileage >= 100000);
      } else if (filters.mileage.startsWith("under")) {
        const max = Number(filters.mileage.replace("under-", "").replace("k", "000"));
        results = results.filter((l) => l.mileage <= max);
      } else {
        const [min, max] = filters.mileage.split("-").map((v) => Number(v.replace("k", "000")));
        results = results.filter((l) => l.mileage >= min && l.mileage <= max);
      }
    }

    setFiltered(results);
  };

  if (loading) {
    return <p className="text-gray-600">Loading RV listings…</p>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">RVs & Campers</h1>

      {/* Filters */}
      <RVFilters onChange={applyFilters} />

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Results</h2>

        {filtered.length === 0 ? (
          <p className="text-gray-600">No RVs match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border rounded-xl shadow p-4 space-y-4 cursor-pointer"
                onClick={() =>
                  router.push(`/storefronts/${storeId}/listings/${listing.id}`)
                }
              >
                {/* Thumbnail */}
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