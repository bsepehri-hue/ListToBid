"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import StorefrontCard from "@/components/StorefrontCard";
import Link from "next/link";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function StorefrontDashboardClient() {
  const [storefronts, setStorefronts] = useState<any[]>([]);
  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "storefronts"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setStorefronts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="storefront-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storefronts.map((sf) => (
        <StorefrontCard
          key={sf.id}
          name={sf.name}
          owner={sf.ownerName}
          storeId={sf.id}
        />
      ))}

      <Link href="/dashboard/storefront/create">
        <div className="l2b-card l2b-flex-col l2b-items-center l2b-gap-2 l2b-cursor-pointer l2b-border-dashed l2b-justify-center l2b-text-center">
          <span className="l2b-text-3xl l2b-text-muted">+</span>
          <p className="l2b-text-bold">Create New Storefront</p>
        </div>
      </Link>
    </div>
  );
}