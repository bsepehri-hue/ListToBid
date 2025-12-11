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