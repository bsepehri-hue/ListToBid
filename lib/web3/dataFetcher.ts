import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
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
    };
  });
}

// Stubbed auction functions
export async function fetchAllActiveAuctions() { return []; }
export async function fetchAuctionById(id: string) { return null; }
export async function fetchOrderById(orderId: string) { return null; }