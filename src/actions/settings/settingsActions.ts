"use server";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { mockUserSettings, UserSettings, AccountSettings, NotificationSettings, PrivacySettings, PayoutSettings } from '@/lib/mockData/settings';

// Mock state management (in a real app, this would hit Firestore/DB)
let currentSettings: UserSettings = { ...mockUserSettings };

// --- Fetch Action ---
export async function getSettings(): Promise<UserSettings> {
  // In a real app: fetch all settings related to the authenticated user ID
  return currentSettings;
}

// --- Update Actions and Schemas ---

// 1. Account Schema
const AccountSchema = z.object({
  displayName: z.string().min(3, "Display name is required."),
  bio: z.string().max(500, "Bio cannot exceed 500 characters."),
  language: z.enum(['en', 'es', 'fr']),
});

export type SettingsFormState = {
  success: boolean;
  message: string;
  errors?: any; // Generic error type for simplicity across sections
};

export async function updateAccountSettings(
  prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const validatedFields = AccountSchema.safeParse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
    language: formData.get("language"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation Failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // MOCK: Update the state
  currentSettings.account = validatedFields.data as AccountSettings;
  revalidatePath("/dashboard/settings");

  return {
    success: true,
    message: "Account settings saved successfully.",
  };
}

// 2. Notification Schema
const NotificationSchema = z.object({
  emailUpdates: z.boolean().default(false),
  bidAlerts: z.boolean().default(false),
  payoutAlerts: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

export async function updateNotificationSettings(
  prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  // Parse boolean fields (checkboxes only exist in formData if checked)
  const data = {
    emailUpdates: formData.has('emailUpdates'),
    bidAlerts: formData.has('bidAlerts'),
    payoutAlerts: formData.has('payoutAlerts'),
    marketingEmails: formData.has('marketingEmails'),
  };
  
  const validatedFields = NotificationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: 'Validation Failed.', errors: validatedFields.error.flatten().fieldErrors };
  }

  currentSettings.notifications = validatedFields.data as NotificationSettings;
  revalidatePath('/dashboard/settings');

  return { success: true, message: 'Notification preferences updated.' };
}

// 3. Privacy Schema
const PrivacySchema = z.object({
  showActivityFeed: z.boolean().default(false),
  allowDirectMessages: z.boolean().default(false),
  profileVisibility: z.enum(['public', 'private']),
});

export async function updatePrivacySettings(
  prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const data = {
    showActivityFeed: formData.has('showActivityFeed'),
    allowDirectMessages: formData.has('allowDirectMessages'),
    profileVisibility: formData.get('profileVisibility'),
  };
  
  const validatedFields = PrivacySchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: 'Validation Failed.', errors: validatedFields.error.flatten().fieldErrors };
  }

  currentSettings.privacy = validatedFields.data as PrivacySettings;
  revalidatePath('/dashboard/settings');

  return { success: true, message: 'Privacy settings updated successfully.' };
}

// 4. Payout Schema (Simplified as the main Stripe integration is elsewhere)
const PayoutSchema = z.object({
  preferredToken: z.string().startsWith('0x', "Must be a valid Ethereum address."),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
});

export async function updatePayoutSettings(
  prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const validatedFields = PayoutSchema.safeParse({
    preferredToken: formData.get('preferredToken'),
    frequency: formData.get('frequency'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Validation Failed.', errors: validatedFields.error.flatten().fieldErrors };
  }

  currentSettings.payouts = validatedFields.data as PayoutSettings;
  revalidatePath('/dashboard/settings');

  return { success: true, message: 'Payout settings (Token/Frequency) updated.' };
}
