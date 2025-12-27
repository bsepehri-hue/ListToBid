// src/actions/notifications.ts

import { Notification } from "@/lib/mockData/notifications";

/**
 * Mock: fetch notifications (replace with real API later)
 */
export async function getNotifications(): Promise<Notification[]> {
  // For now, return an empty array or mock data
  return [];
}

/**
 * Mock: mark notifications as read (replace with real API later)
 */
export async function markNotificationsAsRead(ids: string[]): Promise<void> {
  // No-op for now
  console.log("Marked notifications as read:", ids);
}
