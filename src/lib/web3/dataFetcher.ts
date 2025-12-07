import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type AuctionData = {
  auctionId: string;          // unique identifier for the auction
  title: string;
  description: string;
  startingBid: string;
  currentBid?: string;
  sellerAddress: string;
  endsAt: Date;
  createdAt: Date;
};

export async function fetchAllStorefronts(): Promise<StorefrontData[]> {
  const snapshot = await getDocs(collection(db, "storefronts"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || "Untitled Storefront",
      description: data.description || "No description provided",
      color: data.color || "emerald",
    } as StorefrontData;
  });
}

// Stubbed auction functions now typed
export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  return [];
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  return null;
}

export async function fetchOrderById(orderId: string) {
  return null;
} fetchAllActiveAuctions() { return []; }
export async function fetchAuctionById(id: string) { return null; }
export async function fetchOrderById(orderId: string) { return null; }