// src/lib/mockData/settings.ts

export interface AccountSettings {
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
}

export const mockAccountSettings: AccountSettings = {
  language: "English",
  timezone: "PST",
  notificationsEnabled: true,
};

// NEW: Notification settings type
export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export const mockNotificationSettings: NotificationSettings = {
  email: true,
  sms: false,
  push: true,
};