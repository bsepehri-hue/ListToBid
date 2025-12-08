import React, { Suspense } from 'react';
import Link from 'next/link';
import { ShoppingBag, Loader2, Zap } from 'lucide-react';
import { getUnifiedTimeline } from '@/actions/timeline';
import { ActivityTimeline } from '@/components/timeline/ActivityTimeline';
import { TimelineEvent } from '@/types/timeline';

// Component to fetch and display the timeline
async function TimelineFetcher() {
  const rawEvents = await getUnifiedTimeline();

  // Adapt raw events to match TimelineEvent type
  const events: TimelineEvent[] = rawEvents.map(e => ({
    id: e.id,
    title: e.label,                           // map label → title
    date: new Date(e.timestamp).toISOString(), // map timestamp → date string
    type: e.type
  }));

  return <ActivityTimeline timeline={events} />;
}

// Skeleton loader component
function TimelineLoadingSkeleton() {
  return (
    <div className="relative border-l-4 border-gray-200 pl-6 space-y-8 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-8 top-0 w-6 h-6 bg-gray-300 rounded-full border-4 border-white"></div>
          <div className="bg-white rounded-xl p-4 shadow-md space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Reused storefront card component
const StorefrontCard: React.FC<{ name: string; owner: string }> = ({ name, owner }) => (
  <div className="storefront-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer">
    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-500 mt-1">Owner: {owner}</p>
    <Link
      href="/dashboard/stores"
      className="mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm inline-block"
    >
      Manage Store &rarr;
    </Link>
  </div>
);

export default function StorefrontDashboardPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold text-gray-900">Welcome Back, Vault Master!</h1>

      {/* Main Content Grid: Timeline on Left, Storefronts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1 & 2: Unified Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-red-500" /> Unified Activity Timeline
          </h2>
          <p className="text-gray-500">
            A chronological feed of all activity: bids, orders, payouts, and messages.
          </p>

          <Suspense fallback={<TimelineLoadingSkeleton />}>
            <TimelineFetcher />
          </Suspense>
        </div>

        {/* Column 3: Storefronts and Quick Links */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2 text-teal-600" /> My Storefronts
          </h2>

          <div className="storefront-grid grid grid-cols-1 gap-6">
            {/* Placeholder storefront */}
            <StorefrontCard name="Unknown Store" owner="Unknown" />

            {/* Sample hardcoded storefronts */}
            <StorefrontCard name="Emily's Crafts" owner="Emily Peters" />
            <StorefrontCard name="Jumper's Outfits" owner="Oscar Salgado" />

            {/* Call-to-action */}
            <Link
              href="/dashboard/stores/create"
              className="storefront-card bg-white p-6 rounded-xl shadow-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition duration-300 cursor-pointer"
            >
              <span className="text-4xl text-gray-400 mb-2">+</span>
              <p className="font-semibold text-gray-700">Create New Storefront</p>
            </Link>
          </div>

          {/* Placeholder for Quick Stats */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Stats</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                Pending Payouts: <span className="font-bold text-yellow-600">1.5 ETH</span>
              </li>
              <li>
                Open Orders: <span className="font-bold text-blue-600">2</span>
              </li>
              <li>
                Unread Messages: <span className="font-bold text-red-600">3</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}