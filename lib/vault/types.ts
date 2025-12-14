(import { shortenAddress } from "@/lib/utils";

// --- Type Definitions ---

/** Represents a single financial transaction in the user's ledger. */
// lib/vault/types.ts

export interface VaultEntry {
  id: string;
  stewardId: string;
  amount: number;      // normalized to number for charts
  currency: string;
  createdAt: Date;
}

export interface VaultSummary {
  totalBalance: number;
  currency: string;
  entries: VaultEntry[];
}

// --- Mock Data ---

const now = Date.now();
const oneEth = BigInt('1000000000000000000');
const pointFiveEth = BigInt('500000000000000000');

export const mockVaultSummary: VaultSummary = {
  currentBalance: oneEth * BigInt(45), // Mock: 45 ETH balance
  pendingPayouts: oneEth * BigInt(12), // Mock: 12 ETH pending
  lifetimeEarnings: oneEth * BigInt(350), // Mock: 350 ETH lifetime
  totalFeesPaid: pointFiveEth * BigInt(5), // Mock: 2.5 ETH in fees
};

export const mockTransactionLedger: Transaction[] = [
  {
    id: 'txn_001',
    type: 'EARNING',
    description: 'Auction #101 Sale - Rare Emerald Necklace',
    amount: oneEth * BigInt(50),
    token: 'WETH',
    timestamp: new Date(now - 86400000 * 2), // 2 days ago
    txnHash: '0xabc123456789def0123456789abcde',
  },
  {
    id: 'txn_002',
    type: 'PAYOUT',
    description: 'Wallet Payout Request',
    amount: oneEth * BigInt(-25), // Negative for outgoing
    token: 'ETH',
    timestamp: new Date(now - 86400000 * 5), // 5 days ago
    txnHash: '0xdef0123456789abcde123456789abc12',
  },
  {
    id: 'txn_003',
    type: 'EARNING',
    description: 'Auction #105 Sale - Custom T-Shirt',
    amount: oneEth * BigInt(15),
    token: 'WETH',
    timestamp: new Date(now - 86400000 * 7), // 7 days ago
    txnHash: '0x123456789abcde0123456789abcdef0',
  },
  {
    id: 'txn_004',
    type: 'FEE',
    description: 'Service Fee for Auction #101',
    amount: pointFiveEth * BigInt(-1), // Negative for fee
    token: 'ETH',
    timestamp: new Date(now - 86400000 * 2),
    txnHash: '0xabc123456789def0123456789abcde',
  },
  {
    id: 'txn_005',
    type: 'DEPOSIT',
    description: 'Initial Vault Funding',
    amount: oneEth * BigInt(100),
    token: 'ETH',
    timestamp: new Date(now - 86400000 * 30), // 30 days ago
    txnHash: '0x00000000000000000000000000000000',
  },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by newest first

/** Line chart point for merchant net value */
export interface MerchantPoint {
  date: string;
  netValue: number;
}

/** Pie chart slice for referral discounts */
export interface ReferralSlice {
  label: string;
  value: number;
}

/** Bar chart datum for vault balances */
export interface VaultDatum {
  vaultId: string;
  amount: number;
}

/** Unified interface for Vault Dashboard */
export interface VaultDashboardData {
  summary: VaultSummary;
  transactions: Transaction[];
  merchantData: MerchantPoint[];
  referralData: ReferralSlice[];
  vaultData: VaultDatum[];
}
