// src/lib/mockData/orders.ts

// src/lib/mockData/orders.ts
import { OrderStatus } from "@/lib/orders/data";

export { OrderStatus }; // ✅ re-export so other files can import it

export interface Order {
  id: string;
  customer: string;
  product: string;
  totalAmount: bigint;   // ✅ add this
  address: string;
  status: OrderStatus;
  orderDate: Date;       // ✅ rename createdAt to match usage
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