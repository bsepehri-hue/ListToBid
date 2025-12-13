import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { VaultSummaryCards } from './VaultSummaryCards';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { useTheme } from "@/lib/hooks/useTheme";

export default function VaultDashboard() {
  const { isDark } = useTheme(); // ✅ use shared theme state

  // now charts adapt automatically
  <LineChart width={500} height={300} data={merchantData}>
    <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
    <XAxis dataKey="date" stroke={isDark ? "#aaa" : "#000"} />
    <YAxis stroke={isDark ? "#aaa" : "#000"} />
    <Tooltip contentStyle={{ backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }} />
    <Line type="monotone" dataKey="netValue" stroke={isDark ? "#14b8a6" : "#8884d8"} />
  </LineChart>
}


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
  const [isDark, setIsDark] = useState(true);

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400 transition-colors duration-500 ease-in-out">
        Vault Dashboard
      </h2>

      {/* Summary Cards */}
      <VaultSummaryCards summary={summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Merchant Net Value */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400 transition-colors duration-500 ease-in-out">
            Merchant Net Value
          </h3>
          <LineChart width={500} height={300} data={merchantData}>
            <CartesianGrid stroke={isDark ? '#444' : '#ccc'} />
            <XAxis dataKey="date" stroke={isDark ? '#aaa' : '#000'} />
            <YAxis stroke={isDark ? '#aaa' : '#000'} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#222' : '#fff',
                color: isDark ? '#fff' : '#000',
              }}
            />
            <Line type="monotone" dataKey="netValue" stroke={isDark ? '#14b8a6' : '#8884d8'} />
          </LineChart>
        </div>

        {/* Referral Discounts */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-amber-500 dark:text-amber-400 transition-colors duration-500 ease-in-out">
            Referral Discounts
          </h3>
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
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#222' : '#fff',
                color: isDark ? '#fff' : '#000',
              }}
            />
          </PieChart>
        </div>
      </div>

      {/* Vault Totals */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-8 transition-colors duration-500 ease-in-out">
        <h3 className="text-lg font-semibold mb-2 text-burgundy-600 dark:text-burgundy-500 transition-colors duration-500 ease-in-out">
          Vault Totals
        </h3>
        <BarChart width={600} height={300} data={vaultData}>
          <CartesianGrid stroke={isDark ? '#444' : '#ccc'} />
          <XAxis dataKey="vaultId" stroke={isDark ? '#aaa' : '#000'} />
          <YAxis stroke={isDark ? '#aaa' : '#000'} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#222' : '#fff',
              color: isDark ? '#fff' : '#000',
            }}
          />
          <Bar dataKey="amount" fill={isDark ? '#14b8a6' : '#82ca9d'} />
        </BarChart>
      </div>
    </div>
  );
}