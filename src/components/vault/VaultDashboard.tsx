import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // adjust path if needed
import BalanceCard from './BalanceCard';
import TransactionRow from './TransactionRow';

export default function VaultDashboard() {
  const [txnCount, setTxnCount] = useState(0);
  const [merchantNet, setMerchantNet] = useState(0);
  const [referralTotal, setReferralTotal] = useState(0);
  const [vaultTotal, setVaultTotal] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      const txnSnapshot = await db.collection('txn001').get();
      setTxnCount(txnSnapshot.size);

      let net = 0;
      txnSnapshot.forEach(doc => net += doc.data().netValue);
      setMerchantNet(net);

      const referralSnapshot = await db.collection('txn002').get();
      let referral = 0;
      referralSnapshot.forEach(doc => referral += doc.data().discountApplied || 0);
      setReferralTotal(referral);

      const vaultSnapshot = await db.collection('txn004').get();
      let locked = 0;
      vaultSnapshot.forEach(doc => locked += doc.data().amount);
      setVaultTotal(locked);
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      <h2>Vault Dashboard</h2>
      <BalanceCard label="Merchant Net Value" value={merchantNet} />
      <BalanceCard label="Referral Discounts Applied" value={referralTotal} />
      <BalanceCard label="Total Locked in Vaults" value={vaultTotal} />
      <div>Total Merchant Transactions: {txnCount}</div>
      {/* Example: render rows if needed */}
      {/* <TransactionRow ... /> */}
    </div>
  );
}