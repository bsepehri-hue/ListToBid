// src/lib/mockData/orders.ts

// src/lib/mockData/orders.ts
import { OrderStatus } from "@/lib/orders/data";

export interface Order {
  id: string;
  customer: string;
  product: string;
  amountEth: number;
  address: string;
  status: OrderStatus;
  createdAt: Date;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Emily Peters",
    product: "Handmade Necklace",
    amountEth: 0.25,
    address: "0x1234...abcd",
    status: OrderStatus.SHIPPED,
    createdAt: new Date(),
  },
  {
    id: "ORD-2024-002",
    customer: "John Smith",
    product: "Vintage Watch",
    amountEth: 1.5,
    address: "0x5678...efgh",
    status: OrderStatus.PENDING_PAYMENT,
    createdAt: new Date(),
  },
];