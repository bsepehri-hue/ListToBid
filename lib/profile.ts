export type UserProfile = {
  id: string;
  displayName: string;   // <-- required
  email: string;
  name?: string;          // optional if you want both
  walletAddress?: string;
  avatarUrl?: string;
  createdAt: string;
};
