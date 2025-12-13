"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { VaultSummaryCards } from "./VaultSummaryCards";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import FadeIn from "@/components/ui/FadeIn"; // ✅ reusable fade-in wrapper
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { useTheme } from "@/lib/hooks/useTheme";

export default function VaultDashboard() {
  const { isDark } = useTheme();

  const [summary, setSummary] = useState({
    currentBalance: BigInt(0),
    pendingPayouts: BigInt(0),
    lifetimeEarnings: BigInt(0),
    totalFeesPaid: BigInt(0),
  });
  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [referralData, setReferralData] = useState<any[]>([]);
  const [vaultData, setVaultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const txnSnapshot = await db.collection("txn001").get();
      const merchantPoints: any[] = [];
      txnSnapshot.forEach(doc => {
        merchantPoints.push({
          date: doc.data().createdAt?.toDate().toLocaleDateString(),
          netValue: doc.data().netValue,
        });
      });
      setMerchantData(merchantPoints);

      // TODO: fetch referralData and vaultData similarly...

      setLoading(false);
    };
    fetchSummary();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">
        Vault Dashboard
      </h2>

      <FadeIn>
        <VaultSummaryCards summary={summary} />
      </FadeIn>

      <FadeIn delay={200}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Merchant Net Value */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <LineChart width={500} height={300} data={merchantData}>
              <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
              <XAxis dataKey="date" stroke={isDark ? "#aaa" : "#000"} />
              <YAxis stroke={isDark ? "#aaa" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#222" : "#fff",
                  color: isDark ? "#fff" : "#000",
                }}
              />
              <Line type="monotone" dataKey="netValue" stroke={isDark ? "#14b8a6" : "#8884d8"} />
            </LineChart>
          </div>

          {/* Referral Discounts */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
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
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#f59e0b" : "#14b8a6"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#222" : "#fff",
                  color: isDark ? "#fff" : "#000",
                }}
              />
            </PieChart>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={400}>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-8">
          <BarChart width={600} height={300} data={vaultData}>
            <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
            <XAxis dataKey="vaultId" stroke={isDark ? "#aaa" : "#000"} />
            <YAxis stroke={isDark ? "#aaa" : "#000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#222" : "#fff",
                color: isDark ? "#fff" : "#000",
              }}
            />
            <Bar dataKey="amount" fill={isDark ? "#14b8a6" : "#82ca9d"} />
          </BarChart>
        </div>
      </FadeIn>
    </div>
  );
}