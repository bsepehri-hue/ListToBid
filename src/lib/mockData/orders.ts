// src/lib/mockData/orders.ts

export enum OrderStatus {
  PENDINGPAYMENT = "PENDINGPAYMENT",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  amountEth: number;
  address: string;
  status: OrderStatus;
  createdAt: Date;
}

// Example mock orders
export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Emily Peters",
    product: "Handmade Necklace",
    amountEth: 0.25,
    address: "0x1234...abcd",
    status: OrderStatus.Shipped,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "ORD-2024-002",
    customer: "John Smith",
    product: "Vintage Watch",
    amountEth: 1.5,
    address: "0x5678...efgh",
    status: OrderStatus.Pending,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];