// src/lib/mockData/notifications.ts

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

// Example mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "n_001",
    title: "Order Shipped",
    description: "Your order ORD-2024-001 has been shipped.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    isRead: false,
    link: "/dashboard/orders/ORD-2024-001",
  },
  {
    id: "n_002",
    title: "New Message",
    description: "Emily Peters sent you a message.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    isRead: false,
    link: "/dashboard/messages?convo=conv_1",
  },
];
