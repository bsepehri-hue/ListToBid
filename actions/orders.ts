// actions/orders.ts
export async function updateOrderStatus(orderId: string, status: string) {
  console.log(`Order ${orderId} updated to ${status}`);
}
