import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AuctionData } from "@/types/auction";

export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export async function fetchAllStorefronts(): Promise<StorefrontData[]> {
  const snapshot = await getDocs(collection(db, "storefronts"));
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name || "Untitled Storefront",
      description: data.description || "No description provided",
      color: data.color || "emerald",
    };
  });
}

// Canonical auction functions
export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  return [];
}

export async function fetchOrderById(orderId: string) {
  return null;
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  const ref = doc(collection(db, "auctions"), id); // ✅ correct v9 syntax
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    auctionId: snapshot.id,
    listingName: data.listingName || "Untitled Auction",
    title: data.title || "Untitled Auction",
    description: data.description || "No description provided",
    startingBid: data.startingBid?.toString() || "0",
    currentBid: data.currentBid?.toString(),
    sellerAddress:
      data.sellerAddress ||
      "0x0000000000000000000000000000000000000000",

    endsAt: data.endsAt?.toDate?.() ?? new Date(),
    createdAt: data.createdAt?.toDate?.() ?? new Date(),

    imageUrl: data.imageUrl || "",
    itemUri: data.itemUri || "",
    storefrontId: data.storefrontId || "",
    highestBidder: data.highestBidder || "",

    // 🔥 REQUIRED BY AuctionData
    bids: data.bids || [],
  };
}