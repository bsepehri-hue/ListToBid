import { Banknote, CreditCard, BarChart2 } from 'lucide-react';
import { mockVaultSummary, mockTransactionLedger, Transaction } from '@/lib/mockData/vault';
import { VaultSummaryCards } from '@/components/vault/BalanceCard';
import { TransactionRow } from '@/components/vault/TransactionRow';
import { StripeConnectActions } from '@/components/vault/StripeConnectActions';
import { Button } from '@/components/ui/Button'; // NEW IMPORT
import { Card } from '@/components/ui/Card'; // NEW IMPORT

// Headers for the transaction ledger table
const LEDGER_HEADERS = [
    'Transaction', 
    'Amount', 
    'Date', 
    'Hash / Details'
];

export default function VaultDashboardPage() {
  
  const handlePayout = () => {
    console.log("Triggering Payout Request...");
    alert("Payout request initiated! (Mock action)");
  };

  return (
    <div className="space-y-10">
      
      {/* Title and Action */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Banknote className="w-7 h-7 mr-3 text-teal-600" />
          Payouts & Vault Dashboard
        </h1>
        {/* Replaced raw button with Button primitive */}
        <Button
          onClick={handlePayout}
          variant="primary"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Request Payout
        </Button>
      </div>
      
      {/* Stripe Connect Status and Actions */}
      <StripeConnectActions />

      {/* Summary Cards */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" /> Financial Overview
        </h2>
        <VaultSummaryCards summary={mockVaultSummary} />
      </section>

      {/* Transaction Ledger */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions (Ledger)</h2>
        
        {/* Replaced raw div with Card component for consistent styling */}
        <Card padding="none"> 
          
          {/* Table Header (Mimic table structure with CSS Grid for responsiveness) */}
          <div className="grid grid-cols-12 gap-4 py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">
            <div className="col-span-6 md:col-span-4">Transaction</div>
            <div className="col-span-3 md:col-span-2 text-right">Amount</div>
            <div className="col-span-3 md:col-span-2 hidden sm:block text-right">Date</div>
            <div className="col-span-12 md:col-span-4 text-right">Reference</div>
          </div>
          
          {/* Transaction Rows */}
          <div className="divide-y divide-gray-100">
            {mockTransactionLedger.map((txn: Transaction) => (
              <TransactionRow key={txn.id} transaction={txn} />
            ))}
          </div>
          
          {/* Footer/More Link */}
          <div className="p-4 text-center">
            {/* Replaced raw button with Button primitive */}
            <Button variant="ghost" className="text-sm">
                View Full History &rarr;
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}