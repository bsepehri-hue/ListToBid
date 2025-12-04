// lib/web3/dataFetcher.ts
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

// Define the storefront data shape
export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
};

// Define the auction data shape (expand later as needed)
export type AuctionData = {
  id: string;
  title: string;
  description: string;
  currentBid: number;
};

// Fetch all storefronts from Firestore
export async function fetchAllStorefronts(): Promise<StorefrontData[]> {
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, "storefronts"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || "Untitled Storefront",
      description: data.description || "No description provided",
      color: data.color || "emerald", // fallback to emerald
    } as StorefrontData;
  });
}

// ✅ Stubbed auction functions so imports resolve

export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  // Replace with Firestore query later
  return [];
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  // Replace with Firestore query later
  return null;
}

export async function fetchOrderById(orderId: string): Promise<any | null> {
  // Replace with Firestore query later
  return null;
}