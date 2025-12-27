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

export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  return [];
}

export async function fetchOrderById(orderId: string) {
  return null;
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  const ref = doc(collection(db, "auctions"), id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  // Normalize Firestore timestamps or ISO strings
  const normalizeDate = (value: any): Date =>
    value?.toDate?.() ?? new Date(value ?? Date.now());

  // Normalize bids into canonical Bid[]
  const bids = Array.isArray(data.bids)
    ? data.bids.map((b: any) => ({
        bidAmount: b.bidAmount?.toString() ?? b.amount?.toString() ?? "0",
        bidderAddress: b.bidderAddress ?? b.bidder ?? "",
        timestamp: normalizeDate(b.timestamp),
      }))
    : [];

  return {
    auctionId: snapshot.id,
    listingName: data.listingName || "Untitled Auction",
    title: data.title || "Untitled Auction",
    description: data.description || "No description provided",

    startingBid: data.startingBid?.toString() || "0",
    currentBid: data.currentBid?.toString() || "0", // 🔥 always return a string

    sellerAddress:
      data.sellerAddress ||
      "0x0000000000000000000000000000000000000000",

    endsAt: normalizeDate(data.endsAt),
    createdAt: normalizeDate(data.createdAt),

    imageUrl: data.imageUrl || "",
    itemUri: data.itemUri || "",
    storefrontId: data.storefrontId || "",
    highestBidder: data.highestBidder || "",

    bids, // 🔥 canonical Bid[]
  };
}