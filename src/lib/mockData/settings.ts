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
}

export const mockPayoutSettings: PayoutSettings = {
  autoPayouts: true,
  preferredMethod: "stripe",
  notifyOnPayout: true,
};