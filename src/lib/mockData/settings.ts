// src/lib/mockData/settings.ts

export interface AccountSettings {
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
  displayName?: string;  // added
  bio?: string;          // added
}

export const mockAccountSettings: AccountSettings = {
  language: "English",
  timezone: "PST",
  notificationsEnabled: true,
  displayName: "Babak Sepehri", // sample mock value
  bio: "Founder of ListToBid",  // sample mock value
};