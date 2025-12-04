// lib/web3/dataFetcher.ts
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";

// Define the storefront data shape
export type StorefrontData = {
  id: string;
  name: string;
  description: string;
  color: string;
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