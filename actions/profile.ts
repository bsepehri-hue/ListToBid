import { UserProfile } from "@/lib/profile";

export async function getProfile(userId: string): Promise<UserProfile> {
  // Temporary mock until backend is wired
  return {
    id: userId,
    displayName: "John Doe",
    email: "john@example.com",
    name: "John Doe",
    bio: "This is a sample bio.",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    avatarUrl: "",
    storefrontId: "store-001",
    joinDate: new Date(),
    twoFactorEnabled: false,
    createdAt: new Date().toISOString(),
  };
}
