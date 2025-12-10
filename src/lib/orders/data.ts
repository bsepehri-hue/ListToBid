import { mockOrders, Order } from '@/lib/orders/data';

export async function getOrderById(id: string): Promise<Order | undefined> {
  return mockOrders.find(o => o.id === id);
}

import { shortenAddress, formatEther } from "@/lib/utils";

// --- Type Definitions ---

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  auctionId: string;
  listingName: string;
  finalPrice: bigint; // Price in Wei
  itemUri: string; // Image/metadata link
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  buyerAddress: string;
  sellerAddress: string;
  storefrontId: string;
  storeName?: string;
  status: OrderStatus;
  createdAt: Date;   // <-- renamed from orderDate
  totalAmount: bigint;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingTrackingNumber: string | null;
  shippingCarrier: string | null;
}

// --- Mock Data ---

const oneEth = BigInt("1000000000000000000");
const pointTwoEth = BigInt("200000000000000000");

const mockShippingAddress: ShippingAddress = {
  name: "Jane Doe",
  street: "123 Auction Lane",
  city: "Amoy City",
  state: "PO",
  zip: "12345",
  country: "Polygon",
};

export const mockOrders = [
  {
    id: "ORD-2024-001",
    buyerAddress: shortenAddress("0xBuyerAddr0123456789"),
    sellerAddress: shortenAddress("0xSellerAddrAABBCCDD"),
    storefrontId: "1",
    storeName: "Emerald Treasures", // <-- add
    status: "PROCESSING",
    orderDate: new Date(Date.now() - 86400000 * 1),
    totalAmount: oneEth * BigInt(5),
    items: [ /* ... */ ],
    shippingAddress: mockShippingAddress,
    shippingTrackingNumber: null,
    shippingCarrier: null,
  },
  {
    id: "ORD-2024-002",
    buyerAddress: shortenAddress("0xBuyerAddr9876543210"),
    sellerAddress: shortenAddress("0xSellerAddrAABBCCDD"),
    storefrontId: "2",
    storeName: "Fashion Hub", // <-- add
    status: "SHIPPED",
    orderDate: new Date(Date.now() - 86400000 * 3),
    totalAmount: pointTwoEth * BigInt(10),
    items: [ /* ... */ ],
    shippingAddress: { ...mockShippingAddress, name: "John Smith" },
    shippingTrackingNumber: "LTB987654321",
    shippingCarrier: "FedEx",
  },
  {
    id: "ORD-2024-003",
    buyerAddress: shortenAddress("0xBuyerAddrEEEEFFFF"),
    sellerAddress: shortenAddress("0xSellerAddrAABBCCDD"),
    storefrontId: "1",
    storeName: "Leather Works", // <-- add
    status: "PENDING_PAYMENT",
    orderDate: new Date(Date.now() - 86400000 * 5),
    totalAmount: oneEth * BigInt(1),
    items: [ /* ... */ ],
    shippingAddress: mockShippingAddress,
    shippingTrackingNumber: null,
    shippingCarrier: null,
  },
] satisfies Order[];