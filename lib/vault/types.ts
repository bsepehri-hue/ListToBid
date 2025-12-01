import { shortenAddress } from "@/lib/utils";

// --- Type Definitions ---

/** Represents a single financial transaction in the user's ledger. */
export interface Transaction {
  id: string;
  type: 'PAYOUT' | 'EARNING' | 'FEE' | 'DEPOSIT';
  description: string;
  amount: bigint; // Use BigInt to represent currency in Wei or tokens
  token: 'MATIC' | 'ETH' | 'USDC' | 'LTB' | 'WETH';
  timestamp: Date;
  txnHash: string; // Blockchain transaction hash
}

/** Represents the aggregated financial summary. */
export interface VaultSummary {
  currentBalance: bigint;
  pendingPayouts: bigint;
  lifetimeEarnings: bigint;
  totalFeesPaid: bigint;
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
