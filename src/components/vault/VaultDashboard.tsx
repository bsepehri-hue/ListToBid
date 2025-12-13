import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // adjust import

export default function VaultDashboard() {
  const [merchantNet, setMerchantNet] = useState(0);
  const [referralTotal, setReferralTotal] = useState(0);
  const [vaultTotal, setVaultTotal] = useState(0);
  const [txnCount, setTxnCount] = useState(0);

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
      <div>Total Merchant Transactions: {txnCount}</div>
      <div>Merchant Net Value: ${merchantNet}</div>
      <div>Referral Discounts Applied: ${referralTotal}</div>
      <div>Total Locked in Vaults: ${vaultTotal}</div>
    </div>
  );
}