"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function BuyerTimelinePage() {
  const { user } = useAuth();
  const buyerId = user?.uid;

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!buyerId) return;

    const load = async () => {
      setLoading(true);

      const timelineQuery = query(
        collection(db, "timeline"),
        where("buyerId", "==", buyerId),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const snap = await getDocs(timelineQuery);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setEvents(rows);
      setLoading(false);
    };

    void load();
  }, [buyerId]);

  if (!buyerId) {
    return <p className="p-6 text-gray-500">You must be logged in as a buyer.</p>;
  }

  if (loading) {
    return <p className="p-6 text-gray-500">Loading your activity…</p>;
  }

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Your Activity</h1>
        <p className="text-sm text-gray-500">
          Purchases, refunds, and system updates.
        </p>
      </header>

      <section className="space-y-2">
        <div className="overflow-auto rounded border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th>Time</Th>
                <Th>Type</Th>
                <Th>Label</Th>
                <Th>Amount</Th>
                <Th>Seller</Th>
                <Th>Context</Th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((e) => (
                  <tr key={e.id} className="border-t">
                    <Td>{e.createdAt ? new Date(e.createdAt).toLocaleString() : "-"}</Td>
                    <Td>{e.type}</Td>
                    <Td>{e.label}</Td>
                    <Td>{e.amount ? `$${e.amount}` : "-"}</Td>
                    <Td>{e.sellerId ?? "-"}</Td>
                    <Td>{e.contextId ?? "-"}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan={6} className="text-center text-gray-500">
                    No activity yet.
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </th>
  );
}

function Td({
  children,
  colSpan,
  className = "",
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  return (
    <td
      className={`px-3 py-2 align-top text-xs text-gray-800 ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}