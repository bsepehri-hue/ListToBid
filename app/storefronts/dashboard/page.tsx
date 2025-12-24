"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Link from "next/link";
import StorefrontCard from "@/components/StorefrontCard";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// Storefront card component
// Auth
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";

export default function StorefrontDashboardPage() {
  const [storefronts, setStorefronts] = useState<any[]>([]);
  const { user } = useFirebaseAuth(); // ← ADD THIS LINE

  useEffect(() => {
    if (!user) return; // Wait for Firebase auth to load

    const q = query(
      collection(db, "storefronts"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setStorefronts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]); // ← IMPORTANT: re-run when user loads

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Store Owner!</h1>

      {/* Storefronts Section */}
      <section className="storefronts">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
          Your Active Storefronts
        </h2>

        <div className="storefront-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {storefronts.map((sf) => (
  <StorefrontCard
    key={sf.id}
    name={sf.name}
    owner={sf.ownerName}
    storeId={sf.id}
  />
))}

          {/* CTA card */}
          <Link href="/dashboard/storefront/create">
  <div className="l2b-card l2b-flex-col l2b-items-center l2b-gap-2 l2b-cursor-pointer l2b-border-dashed l2b-justify-center l2b-text-center">
    <span className="l2b-text-3xl l2b-text-muted">+</span>
    <p className="l2b-text-bold">Create New Storefront</p>
  </div>
</Link>
        </div>
      </section>
    </div>
  );
}
