import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications"; // your existing hook

export function useNotificationsPanel(userId: string | undefined) {
  const [notifOpen, setNotifOpen] = useState(false);

  const { hasUnread, notifications } = useNotifications(userId);

  function toggleNotifications() {
    setNotifOpen((prev) => !prev);
  }

  function closeNotifications() {
    setNotifOpen(false);
  }

  return {
    notifOpen,
    toggleNotifications,
    closeNotifications,
    hasUnread,
    notifications,
  };
}