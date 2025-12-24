"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Loader2, Zap } from "lucide-react";
import { ActivityTimeline } from "../../components/timeline/ActivityTimeline";
import { TimelineEvent } from "@/types/timeline";
import { mockAuctionList } from "@/auctions/mockData";
import BidChart from "@/auctions/BidChart";
import TimelineFetcher from "./TimelineFetcher"; // ← server component

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

// Storefront card component
const StorefrontCard: React.FC<{ name: string; owner: string }> = ({
  name,
  owner,
}) => (
  <div className="storefront-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer">
    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-500 mt-1">Owner: {owner}</p>
    <Link
      href="/dashboard/stores"
      className="mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm inline-block"
    >
      Manage Store →
    </Link>
  </div>
);

export default function StorefrontDashboardPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome Back, Vault Master!
      </h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* <TimelineLoadingSkeleton /> */}
          <TimelineFetcher />
        </div>

        {/* Storefronts & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <StorefrontCard name="Demo Store" owner="Alice" />

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quick Stats
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                Pending Payouts:{" "}
                <span className="font-bold text-yellow-600">1.5 ETH</span>
              </li>
              <li>
                Open Orders:{" "}
                <span className="font-bold text-blue-600">2</span>
              </li>
              <li>
                Unread Messages:{" "}
                <span className="font-bold text-red-600">3</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Auctions Overview */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-amber-500" /> Live Auctions
        </h2>
        <p className="text-gray-500 mb-4">
          Track active auctions, bids, and timing across the marketplace.
        </p>

        {mockAuctionList.map((auction) => (
          <div key={auction.id} className="py-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {auction.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Ends: {/* client-only timestamp */} — Current Bid:{" "}
              <span className="font-bold text-teal-600">
                {auction.bids.length > 0
                  ? (Number(auction.bids[0].amount) / 1e18).toFixed(3) + " ETH"
                  : "No bids yet"}
              </span>
            </p>
            {auction.bids.length > 0 && <BidChart bids={auction.bids} />}
          </div>
        ))}
      </div>
    </div>
  );
}