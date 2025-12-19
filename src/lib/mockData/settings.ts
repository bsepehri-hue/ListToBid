// src/lib/mockData/settings.ts

export interface AccountSettings {
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
  displayName?: string;
  bio?: string;
}

export const mockAccountSettings: AccountSettings = {
  language: "English",
  timezone: "PST",
  notificationsEnabled: true,
  displayName: "Babak Sepehri",
  bio: "Founder of ListToBid",
};

export interface NotificationSettings {
  bidAlerts: boolean;
  payoutAlerts: boolean;
  emailUpdates: boolean;
  marketingEmails: boolean;
}

export const mockNotificationSettings: NotificationSettings = {
  bidAlerts: true,
  payoutAlerts: true,
  emailUpdates: true,
  marketingEmails: false,
};

export interface PayoutSettings {
  autoPayouts: boolean;
  preferredMethod: "stripe" | "paypal" | "bank";
  notifyOnPayout: boolean;
  preferredToken: string;
  frequency: "daily" | "weekly" | "monthly";
}

export const mockPayoutSettings: PayoutSettings = {
  autoPayouts: true,
  preferredMethod: "stripe",
  notifyOnPayout: true,
  preferredToken: "0x0000000000000000000000000000000000000000", // mock WETH address
  frequency: "weekly",
};