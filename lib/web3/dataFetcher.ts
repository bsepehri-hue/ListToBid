// lib/web3/dataFetcher.ts

// Temporary stubs for auction/storefront/order fetchers

export async function fetchAllActiveAuctions() {
  console.warn("fetchAllActiveAuctions stub called");
  return [];
}

export async function fetchAuctionById(id: string) {
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