"use client";

import { Banknote, CreditCard, BarChart2 } from "lucide-react";
import VaultSummaryCards from "@/components/vault/BalanceCard";
import { TransactionRow } from "@/components/vault/TransactionRow";
import { StripeConnectActions } from "@/components/StripeConnectActions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getVaultSummary, getTransactionLedger } from "@/lib/vault/data";
import { useEffect, useState } from "react";

export default function VaultDashboardClient() {
  const user = { id: "demo-user", email: "demo@example.com" };

  const [summary, setSummary] = useState<any>(null);
  const [ledger, setLedger] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const rawSummary = await getVaultSummary(user.id);

      setSummary({
        currentBalance: BigInt(rawSummary.available ?? 0),
        pendingPayouts: BigInt(rawSummary.pending ?? 0),
        lifetimeEarnings: BigInt(rawSummary.lifetime ?? 0),
        totalFeesPaid: BigInt(rawSummary.fees ?? 0),
      });

      const ledgerData = await getTransactionLedger(user.id);
      setLedger(ledgerData);
    }

    load();
  }, []);

  const handlePayout = () => {
    alert("Payout request initiated! (Mock action)");
  };

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Banknote className="w-7 h-7 mr-3 text-teal-600" />
          Payouts & Vault Dashboard
        </h1>
        <Button onClick={handlePayout} variant="primary">
          <CreditCard className="w-5 h-5 mr-2" />
          Request Payout
        </Button>
      </div>

      <StripeConnectActions userId={user.id} email={user.email} />

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" /> Financial Overview
        </h2>
        <VaultSummaryCards summary={summary} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Transactions (Ledger)
        </h2>
        <Card padding="none">
          <div className="grid grid-cols-12 gap-4 py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">
            <div className="col-span-6 md:col-span-4">Transaction</div>
            <div className="col-span-3 md:col-span-2 text-right">Amount</div>
            <div className="col-span-3 md:col-span-2 hidden sm:block text-right">Date</div>
            <div className="col-span-12 md:col-span-4 text-right">Reference</div>
          </div>

          <div className="divide-y divide-gray-100">
            {ledger.map((txn) => (
              <TransactionRow key={txn.id} transaction={txn} />
            ))}
          </div>

          <div className="p-4 text-center">
            <Button variant="ghost" className="text-sm">
              View Full History →
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}