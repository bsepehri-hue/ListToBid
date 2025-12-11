// src/lib/mockData/settings.ts

export interface AccountSettings {
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
  displayName?: string;  // add this
  bio?: string;          // add this
}

export const mockAccountSettings: AccountSettings = {
  language: "English",
  timezone: "PST",
  notificationsEnabled: true,
  displayName: "Babak Sepehri",   // sample mock value
  bio: "Founder of ListToBid",    // sample mock value
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