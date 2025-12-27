// src/lib/mockData/orders.ts

// src/lib/mockData/orders.ts
import { OrderStatus } from "@/lib/orders/data";

export { OrderStatus }; // ✅ re-export so other files can import it

export interface Order {
  id: string;
  customer: string;
  product: string;
  totalAmount: bigint;
  buyerAddress: string;   // ✅ already added
  status: OrderStatus;
  orderDate: Date;
  items: OrderItem[];     // ✅ add this to match OrderCard.tsx usage
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Emily Peters",
    product: "Handmade Necklace",
    totalAmount: BigInt(250000000000000000), // 0.25 ETH
    buyerAddress: "0x1234...abcd",           // ✅ added
    status: OrderStatus.SHIPPED,
    orderDate: new Date(),
  },
  {
    id: "ORD-2024-002",
    customer: "John Smith",
    product: "Vintage Watch",
    totalAmount: BigInt(1500000000000000000), // 1.5 ETH
    buyerAddress: "0x5678...efgh",            // ✅ added
    status: OrderStatus.PENDING_PAYMENT,
    orderDate: new Date(),
  },
];