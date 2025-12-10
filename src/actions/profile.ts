// actions/profile.ts
export async function getProfile(userId: string) {
  return {
    id: userId,
    name: "Placeholder User",
    email: "placeholder@example.com",
  };
}

import { UserProfile } from "@/lib/profile/profile";

// Fetch a user profile (placeholder)
export async function getProfile(userId: string): Promise<UserProfile> {
  return {
    walletAddress: "0x1234567890ABCDEF",
    displayName: "Placeholder User",
    bio: "This is a placeholder bio.",
    joinDate: new Date(),
    storefrontId: null,
    emailNotifications: true,
    twoFactorEnabled: false,
  };
}

// Update a user profile (placeholder)
export async function updateProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> {
  return {
    walletAddress: "0x1234567890ABCDEF",
    displayName: updates.displayName || "Updated User",
    bio: updates.bio || "Updated bio",
    joinDate: new Date(),
    storefrontId: updates.storefrontId || null,
    emailNotifications: updates.emailNotifications ?? true,
    twoFactorEnabled: updates.twoFactorEnabled ?? false,
  };
}

// Delete a user profile (placeholder)
export async function deleteProfile(
  userId: string
): Promise<{ id: string; deleted: boolean }> {
  return { id: userId, deleted: true };
}