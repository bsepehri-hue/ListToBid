"use server";

export async function markAsCompleted(formData: FormData) {
  const orderId = formData.get("orderId");
  console.log("markAsCompleted", orderId);
}