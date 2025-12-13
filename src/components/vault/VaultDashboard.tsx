import React, { useEffect, useState } from 'react';
import { db } from '@/firebase'; // adjust path if needed
import { VaultSummaryCards } from './VaultSummaryCards'; // NEW IMPORT

export default function VaultDashboard() {
  const [summary, setSummary] = useState({
    currentBalance: BigInt(0),
    pendingPayouts: BigInt(0),
    lifetimeEarnings: BigInt(0),
    totalFeesPaid: BigInt(0),
  });

  useEffect(() => {
    const fetchSummary = async () => {
      // Example: Merchant net value from txn001
      const txnSnapshot = await db.collection('txn001').get();
      let net = BigInt(0);
      txnSnapshot.forEach(doc => {
        net += BigInt(doc.data().netValue);
      });

      // Example: Referral totals from txn002
      const referralSnapshot = await db.collection('txn002').get();
      let referral = BigInt(0);
      referralSnapshot.forEach(doc => {
        referral += BigInt(doc.data().discountApplied || 0);
      });

      // Example: Vault totals from txn004
      const vaultSnapshot = await db.collection('txn004').get();
      let locked = BigInt(0);
      vaultSnapshot.forEach(doc => {
        locked += BigInt(doc.data().amount);
      });

      setSummary({
        currentBalance: net,
        pendingPayouts: referral,
        lifetimeEarnings: net + referral, // adjust logic as needed
        totalFeesPaid: locked,            // adjust logic as needed
      });
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vault Dashboard</h2>
      <VaultSummaryCards summary={summary} />
    </div>
  );
}