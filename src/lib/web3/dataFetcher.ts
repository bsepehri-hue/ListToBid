import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type AuctionData = {
  auctionId: string;
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

// Canonical auction functions
export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  // TODO: query your "auctions" collection
  return [];
}

export async function fetchOrderById(orderId: string) {
  // TODO: implement order lookup
  return null;
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  const ref = doc(db, "auctions", id);
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
    sellerAddress: data.sellerAddress || "0x0000000000000000000000000000000000000000",
    endsAt: data.endsAt ? new Date(data.endsAt) : new Date(),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    imageUrl: data.imageUrl || "",
    itemUri: data.itemUri || "",
    storefrontId: data.storefrontId || "",
    highestBidder: data.highestBidder || "",
  };
}