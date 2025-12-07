// lib/links.ts

// Static links used across the app
export const links = {
  home: "/",
  auctions: "/auctions",
  about: "/about",
};

// ✅ Add missing export so imports resolve
export function generateShareableAuctionLink(id: string) {
  return `${links.auctions}/${id}`;
}
