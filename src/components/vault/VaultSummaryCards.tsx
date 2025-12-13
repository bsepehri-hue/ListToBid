import React from 'react';
import { Wallet, Clock, TrendingUp, DollarSign } from 'lucide-react'; // ✅ Lucide icons
import { BalanceCard } from './BalanceCard'; // ✅ BalanceCard component

interface VaultSummaryProps {
  summary: {
    currentBalance: bigint;
    pendingPayouts: bigint;
    lifetimeEarnings: bigint;
    totalFeesPaid: bigint;
  };
}

export const VaultSummaryCards: React.FC<VaultSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BalanceCard
        title="Current Balance"
        value={summary.currentBalance}
        icon={Wallet}
        token="WETH/ETH"
        colorClass="text-teal-600"
      />
      <BalanceCard
        title="Pending Payouts"
        value={summary.pendingPayouts}
        icon={Clock}
        token="WETH/ETH"
        colorClass="text-yellow-600"
      />
      <BalanceCard
        title="Lifetime Earnings"
        value={summary.lifetimeEarnings}
        icon={TrendingUp}
        token="WETH/ETH"
        colorClass="text-green-600"
      />
      <BalanceCard
        title="Total Fees Paid"
        value={summary.totalFeesPaid}
        icon={DollarSign}
        token="WETH/ETH"
        colorClass="text-red-600"
      />
    </div>
  );
};