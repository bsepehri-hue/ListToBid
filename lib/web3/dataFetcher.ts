// lib/web3/dataFetcher.ts

// Temporary stubs for auction/storefront/order fetchers

export interface AuctionData {
  id: string;
  title: string;
  description: string;
  seller: string;
  startingBid: bigint;
  endTime: number;
  // add whatever fields your auction model needs
}

export async function fetchAllActiveAuctions(): Promise<AuctionData[]> {
  console.warn("fetchAllActiveAuctions stub called");
  return [];
}

export async function fetchAuctionById(id: string): Promise<AuctionData | null> {
  console.warn("fetchAuctionById stub called with:", id);
  return null;
}

export async function fetchAllStorefronts() {
  console.warn("fetchAllStorefronts stub called");
  return [];
}

export async function fetchOrderById(orderId: string) {
  console.warn("fetchOrderById stub called with:", orderId);
  return null;
}