"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [storefrontCount, setStorefrontCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number | null>(null);
  const [pendingPayoutTotal, setPendingPayoutTotal] = useState<number | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        // Run all reads in parallel (fast + safe)
        const [
          storefrontSnap,
          listingSnap,
          messagesSnap,
          payoutsSnap,
        ] = await Promise.all([
          getDocs(collection(db, "storefronts")),
          getDocs(collection(db, "listings")),
          getDocs(collection(db, "messages")),
          getDocs(collection(db, "payouts")),
        ]);

        if (!isMounted) return;

        // Storefront count
        setStorefrontCount(storefrontSnap.size);

        // Listing count
        setListingCount(listingSnap.size);

        // Unread messages
        const unread = messagesSnap.docs.filter(
          (doc) => doc.data().read === false
        ).length;
        setUnreadMessages(unread);

        // Pending payouts
        const pendingTotal = payoutsSnap.docs
          .filter((doc) => doc.data().status === "pending")
          .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);
        setPendingPayoutTotal(pendingTotal);

        // Recent activity feed
        const activity: any[] = [];

        storefrontSnap.docs.forEach((doc) => {
          activity.push({
            type: "storefront",
            timestamp: doc.data().createdAt || 0,
            message: `New storefront created: ${doc.data().name}`,
          });
        });

        listingSnap.docs.forEach((doc) => {
          activity.push({
            type: "listing",
            timestamp: doc.data().createdAt ||