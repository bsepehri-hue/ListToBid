"use client";

// /src/components/vault/BalanceCard.tsx
import React from "react";

interface VaultSummary {
  currentBalance: bigint;
  pendingPayouts: bigint;
  lifetimeEarnings: bigint;
  totalFeesPaid: bigint;
}

interface VaultSummaryCardsProps {
  summary: VaultSummary;
}

const VaultSummaryCards: React.FC<VaultSummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
        <p className="text-lg font-bold">{summary.currentBalance.toString()}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
        <p className="text-lg font-bold">{summary.pendingPayouts.toString()}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-sm font-medium text-gray-500">Lifetime Earnings</h3>
        <p className="text-lg font-bold">{summary.lifetimeEarnings.toString()}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-sm font-medium text-gray-500">Total Fees Paid</h3>
        <p className="text-lg font-bold">{summary.totalFeesPaid.toString()}</p>
      </div>
    </div>
  );
};

export default VaultSummaryCards;