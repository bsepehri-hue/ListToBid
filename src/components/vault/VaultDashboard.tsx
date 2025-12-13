import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { VaultSummaryCards } from './VaultSummaryCards';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

export default function VaultDashboard() {
  const [summary, setSummary] = useState({
    currentBalance: BigInt(0),
    pendingPayouts: BigInt(0),
    lifetimeEarnings: BigInt(0),
    totalFeesPaid: BigInt(0),
  });

  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [referralData, setReferralData] = useState<any[]>([]);
  const [vaultData, setVaultData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const txnSnapshot = await db.collection('txn001').get();
      let net = BigInt(0);
      const merchantPoints: any[] = [];
      txnSnapshot.forEach(doc => {
        net += BigInt(doc.data().netValue);
        merchantPoints.push({
          date: doc.data().createdAt?.toDate().toLocaleDateString(),
          netValue: doc.data().netValue,
        });
      });

      const referralSnapshot = await db.collection('txn002').get();
      let referral = BigInt(0);
      referralSnapshot.forEach(doc => {
        referral += BigInt(doc.data().discountApplied || 0);
      });
      const referralPoints = [
        { name: 'Referral Discounts', value: Number(referral) },
        { name: 'Other', value: Number(net) },
      ];

      const vaultSnapshot = await db.collection('txn004').get();
      let locked = BigInt(0);
      const vaultBars: any[] = [];
      vaultSnapshot.forEach(doc => {
        locked += BigInt(doc.data().amount);
        vaultBars.push({
          vaultId: doc.data().vaultId,
          amount: doc.data().amount,
        });
      });

      setSummary({
        currentBalance: net,
        pendingPayouts: referral,
        lifetimeEarnings: net + referral,
        totalFeesPaid: locked,
      });
      setMerchantData(merchantPoints);
      setReferralData(referralPoints);
      setVaultData(vaultBars);
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-teal-400">Vault Dashboard</h2>

      {/* Summary Cards */}
      <VaultSummaryCards summary={summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Merchant Net Line Chart */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">Merchant Net Value</h3>
          <LineChart width={500} height={300} data={merchantData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
            <Line type="monotone" dataKey="netValue" stroke="#14b8a6" />
          </LineChart>
        </div>

        {/* Referral Donut Chart */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-amber-400">Referral Discounts</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={referralData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {referralData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#14b8a6'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
          </PieChart>
        </div>
      </div>

      {/* Vault Totals Bar Chart */}
      <div className="bg-gray-800 p-4 rounded shadow mt-8">
        <h3 className="text-lg font-semibold mb-2 text-burgundy-500">Vault Totals</h3>
        <BarChart width={600} height={300} data={vaultData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="vaultId" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
          <Bar dataKey="amount" fill="#14b8a6" />
        </BarChart>
      </div>
    </div>
  );
}