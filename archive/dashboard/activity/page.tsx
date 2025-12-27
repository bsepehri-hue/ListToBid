"use client";

import React from "react"; // ✅ ensures React types are available
import { useEffect, useState } from "react";
import { getRecentActivity } from "@/lib/activity";
import { Store, DollarSign, CreditCard } from "lucide-react"; // icons

export default function ActivityPage({ stewardId }: { stewardId: string }) {
  const [events, setEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchActivity() {
      const recent = await getRecentActivity(stewardId, 50);
      setEvents(recent);
    }
    fetchActivity();
  }, [stewardId]);

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.type.startsWith(filter));

  // ✅ Use React.ReactNode instead of JSX.Element
  const iconMap: Record<string, React.ReactNode> = {
    storefront_created: <Store className="w-5 h-5 text-teal-600" />,
    sale_completed: <DollarSign className="w-5 h-5 text-emerald-600" />,
    payout_requested: <CreditCard className="w-5 h-5 text-amber-600" />,
    payout_confirmed: <CreditCard className="w-5 h-5 text-emerald-600" />,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Activity Timeline</h1>

      {/* Filter buttons */}
      <div className="flex gap-4">
        {["all", "storefront", "sale", "payout"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === f
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <ul className="space-y-6">
          {filteredEvents.map((event) => (
            <li key={event.id} className="relative flex items-start">
              {/* Icon */}
              <div className="absolute -left-2 bg-white rounded-full p-1 shadow">
                {iconMap[event.type] ?? (
                  <Store className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Event content */}
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-900">
                  {event.message}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(event.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}