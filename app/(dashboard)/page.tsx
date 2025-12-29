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
  // Firestore unsubscribe functions
  const unsubStorefronts = onSnapshot(collection(db, "storefronts"), (snap) => {
    setStorefrontCount(snap.size);

    setRecentActivity((prev) => {
      const updates = snap.docChanges().map((change) => ({
        type: "storefront",
        timestamp: change.doc.data().createdAt || 0,
        message: `New storefront created: ${change.doc.data().name}`,
      }));

      return [...updates, ...prev].slice(0, 10);
    });
  });

  const unsubListings = onSnapshot(collection(db, "listings"), (snap) => {
    setListingCount(snap.size);

    setRecentActivity((prev) => {
      const updates = snap.docChanges().map((change) => ({
        type: "listing",
        timestamp: change.doc.data().createdAt || 0,
        message: `New listing: ${change.doc.data().title}`,
      }));

      return [...updates, ...prev].slice(0, 10);
    });
  });

  const unsubMessages = onSnapshot(collection(db, "messages"), (snap) => {
    const unread = snap.docs.filter((doc) => doc.data().read === false).length;
    setUnreadMessages(unread);

    setRecentActivity((prev) => {
      const updates = snap.docChanges().map((change) => ({
        type: "message",
        timestamp: change.doc.data().createdAt || 0,
        message: `New message received`,
      }));

      return [...updates, ...prev].slice(0, 10);
    });
  });

  const unsubPayouts = onSnapshot(collection(db, "payouts"), (snap) => {
    const pendingTotal = snap.docs
      .filter((doc) => doc.data().status === "pending")
      .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

    setPendingPayoutTotal(pendingTotal);

    setRecentActivity((prev) => {
      const updates = snap.docChanges().map((change) => ({
        type: "payout",
        timestamp: change.doc.data().createdAt || 0,
        message: `Payout ${change.doc.data().status}: $${change.doc.data().amount}`,
      }));

      return [...updates, ...prev].slice(0, 10);
    });
  });

  // Cleanup listeners on unmount
  return () => {
    unsubStorefronts();
    unsubListings();
    unsubMessages();
    unsubPayouts();
  };
}, []);
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