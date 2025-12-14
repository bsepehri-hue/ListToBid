// lib/vault/mockData.ts
import { VaultEntry, VaultSummary } from "./types";

export const mockVaultEntries: VaultEntry[] = [
  {
    id: "v-001",
    stewardId: "0x1234...ABCD",
    amount: 500,
    currency: "USD",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "v-002",
    stewardId: "0x5678...EFGH",
    amount: 1200,
    currency: "USD",
    createdAt: new Date("2025-02-01"),
  },
  {
    id: "v-003",
    stewardId: "0x9999...ZZZZ",
    amount: 300,
    currency: "USD",
    createdAt: new Date("2025-03-01"),
  },
];

export const mockVaultSummary: VaultSummary = {
  totalBalance: mockVaultEntries.reduce((sum, e) => sum + e.amount, 0),
  currency: "USD",
  entries: mockVaultEntries,
};