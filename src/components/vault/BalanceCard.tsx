import React from 'react';
import { LucideIcon, Wallet, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { formatEther } from '@/lib/utils';
import { Card } from '@/components/ui/Card'; // NEW IMPORT

interface BalanceCardProps {
  title: string;
  value: bigint;
  icon: LucideIcon;
  token: string;
  colorClass: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ title, value, icon: Icon, token, colorClass }) => {
  const formattedValue = formatEther(value);
  const isNegative = value < BigInt(0);

  return (
    // Replaced raw div with Card component
    <Card className="hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {/* Adjusted background opacity for consistency */}
        <div className={`p-2 rounded-full ${colorClass} bg-opacity-10`}> 
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-3xl font-bold ${isNegative ? 'text-red-600' : 'text-gray-900'}`}>
          {isNegative ? '-' : ''}
          {formattedValue}
        </p>
        <p className="text-sm font-semibold text-teal-600 mt-1">{token}</p>
      </div>
    </Card>
  );
};

interface VaultSummaryProps {
    summary: {
        currentBalance: bigint;
        pendingPayouts: bigint;
        lifetimeEarnings: bigint;
        totalFeesPaid: bigint;
    }
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
}
