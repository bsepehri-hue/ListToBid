// src/lib/mockData/notifications.ts
import {
  Store,
  Extension,
  Link,
  ClipboardList,
  Wallet,
  User,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
  type?: string; // optional type field to decide icon
}

export const mockNotifications: Notification[] = [
  {
    id: "n_001",
    title: "Order Shipped",
    description: "Your order ORD-2024-001 has been shipped.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: false,
    link: "/dashboard/orders/ORD-2024-001",
    type: "orders",
  },
  {
    id: "n_002",
    title: "New Message",
    description: "Emily Peters sent you a message.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    isRead: false,
    link: "/dashboard/messages?convo=conv_1",
    type: "messages",
  },
];

// Helper to pick an icon based on notification type
export function getNotificationIcon(type?: string) {
  switch (type) {
    case "stores":
      return Store;
    case "addons":
      return Extension;
    case "auction":
      return Link;
    case "orders":
      return ClipboardList;
    case "payouts":
      return Wallet;
    case "profile":
      return User;
    case "settings":
      return Settings;
    case "support":
      return HelpCircle;
    default:
      return Bell; // fallback icon
  }
}