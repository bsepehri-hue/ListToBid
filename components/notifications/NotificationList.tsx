'use client';

import React from 'react';
import Link from 'next/link';
import { Notification, getNotificationIcon } from '@/lib/mockData/notifications';
import { markNotificationsAsRead } from '@/actions/notifications';

interface NotificationListProps {
  notifications: Notification[];
  isDropdown?: boolean; // Changes layout for compact view
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications, isDropdown = false }) => {

  const handleNotificationClick = async (notification: Notification) => {
    // 1. Mark as read immediately (optimistic update if possible, otherwise rely on server action)
    if (!notification.isRead) {
      await markNotificationsAsRead(notification.id);
    }
    // 2. Navigate to the link
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 italic">
        You are all caught up!
      </div>
    );
  }

  return (
    <div className={`divide-y divide-gray-100 ${isDropdown ? 'max-h-80 overflow-y-auto' : ''}`}>
      {notifications.map((notification) => {
        const Icon = getNotificationIcon(notification.type);
        
        // Define common classes for both dropdown and page view
        const baseClasses = 'flex p-3 transition duration-150 cursor-pointer';
        const unreadClasses = 'bg-teal-50 hover:bg-teal-100';
        const readClasses = 'bg-white hover:bg-gray-50';

        return (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`${baseClasses} ${notification.isRead ? readClasses : unreadClasses}`}
          >
            {/* Icon */}
            <div className={`flex-shrink-0 p-2 rounded-full ${notification.isRead ? 'bg-gray-100 text-gray-500' : 'bg-teal-600 text-white'}`}>
              <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="ml-3 flex-1 overflow-hidden">
              <p className={`font-semibold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                {notification.title}
              </p>
              <p className={`text-xs mt-0.5 ${notification.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {/* Unread dot */}
            {!notification.isRead && (
              <div className="w-2 h-2 bg-red-500 rounded-full ml-2 flex-shrink-0 mt-1" title="Unread"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
