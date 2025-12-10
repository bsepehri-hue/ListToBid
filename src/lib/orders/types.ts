// src/lib/orders/types.ts

// Define the possible statuses for an order.
// Adjust these values to match your actual business logic.
export type OrderStatus =
  | "PENDING"
  | "PENDING_PAYMENT"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";