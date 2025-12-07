// src/actions/orders.ts

// Update order status (stubbed for now)
export async function updateOrderStatus(orderId: string, status: string) {
  console.log(`Order ${orderId} updated to ${status}`);
}

// ✅ Add missing exports so imports resolve

// Fetch a single order by ID (placeholder)
export async function getOrderById(orderId: string) {
  // Replace with Firestore query later
  return { id: orderId, status: "pending" };
}

// Mark an order as shipped (placeholder)
export async function markOrderAsShipped(orderId: string) {
  // Replace with Firestore update later
  return { id: orderId, status: "shipped" };
}