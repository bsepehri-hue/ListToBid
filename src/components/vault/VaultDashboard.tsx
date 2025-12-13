"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { VaultSummaryCards } from "./VaultSummaryCards";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { useTheme } from "@/lib/hooks/useTheme";

export default function VaultDashboard() {
  const { isDark } = useTheme();
  const [summary, setSummary] = useState({ /* ... */ });
  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [referralData, setReferralData] = useState<any[]>([]);
  const [vaultData, setVaultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // ✅ new state

  useEffect(() => {
    const fetchSummary = async () => {
      // Firestore fetch logic...
      setLoading(false);
    };
    fetchSummary();
  }, []);

  // Trigger fade-in once loading is done
  useEffect(() => {
    if (loading) return <DashboardSkeleton />;

return (
  <div className={`p-6 fade-in ${fadeIn ? "show" : ""}`}>
    <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">
      Vault Dashboard
    </h2>

    <VaultSummaryCards summary={summary} />

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Merchant Net Value */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        {/* LineChart here */}
      </div>

      {/* Referral Discounts */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        {/* PieChart here */}
      </div>
    </div>

    {/* Vault Totals */}
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-8">
      {/* BarChart here */}
    </div>
  </div>
);

        Vault Dashboard
      </h2>

      <VaultSummaryCards summary={summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Merchant Net Value */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
            Merchant Net Value
          </h3>
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
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-amber-500 dark:text-amber-400">
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

      {/* Vault Totals */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-8 transition-colors duration-500 ease-in-out">
        <h3 className="text-lg font-semibold mb-2 text-burgundy-600 dark:text-burgundy-500">
          Vault Totals
        </h3>
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
    </div>
  );
}