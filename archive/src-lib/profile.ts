import { shortenAddress } from "@/lib/utils";
import { DollarSign, Gavel, Store, LogIn } from 'lucide-react';

// --- Type Definitions ---

export type ActivityType = 'BID_PLACED' | 'LISTING_CREATED' | 'PURCHASE' | 'PROFILE_UPDATE';

export interface UserProfile {
  walletAddress: string;
  displayName: string;
  bio: string;
  joinDate: Date;
  storefrontId: string | null;
  // Metadata for settings (mock)
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
}

export interface RecentActivity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: Date;
  link?: string;
}

// --- Mock Data ---

const now = Date.now();

export const mockUserProfile: UserProfile = {
  walletAddress: '0x2e0c2423c7b8C58Ff7E68a52914107F81B1537aB',
  displayName: 'Vault Master',
  bio: 'Dedicated crypto enthusiast and proud storefront owner on ListToBid. Specializing in rare digital artifacts and unique NFT wearables.',
  joinDate: new Date(now - 86400000 * 150), // Joined 150 days ago
  storefrontId: '1', // Linked to an existing storefront
  emailNotifications: true,
  twoFactorEnabled: false,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act_001',
    type: 'BID_PLACED',
    description: 'Placed a bid of 0.75 ETH on "Golden Key NFT"',
    timestamp: new Date(now - 3600000 * 2), // 2 hours ago
    link: '/auctions/205',
  },
  {
    id: 'act_002',
    type: 'LISTING_CREATED',
    description: 'Created new auction listing: "Rare Emerald Necklace"',
    timestamp: new Date(now - 3600000 * 5), // 5 hours ago
    link: '/dashboard/stores/1/listings/101',
  },
  {
    id: 'act_003',
    type: 'PURCHASE',
    description: 'Successfully purchased "Limited Edition Jumper" for 1.5 ETH',
    timestamp: new Date(now - 86400000 * 1), // 1 day ago
    link: '/dashboard/orders/ORD-2024-002',
  },
  {
    id: 'act_004',
    type: 'LOG_IN',
    description: 'Successful login from new device',
    timestamp: new Date(now - 86400000 * 5), // 5 days ago
  },
  {
    id: 'act_005',
    type: 'PROFILE_UPDATE',
    description: 'Updated bio and display name',
    timestamp: new Date(now - 86400000 * 10), // 10 days ago
  },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

/** Utility to get the appropriate icon for activity type */
export function getActivityIcon(type: ActivityType | 'LOG_IN') {
    switch (type) {
      case 'BID_PLACED':
        return Gavel;
      case 'LISTING_CREATED':
        return Store;
      case 'PURCHASE':
        return DollarSign;
      case 'LOG_IN':
        return LogIn;
      case 'PROFILE_UPDATE':
        return LogIn; // Reuse LogIn for now
      default:
        return LogIn; 
    }
}
