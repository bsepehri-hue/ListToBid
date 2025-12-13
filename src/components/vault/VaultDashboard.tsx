import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { VaultSummaryCards } from './VaultSummaryCards';
import { ThemeToggle } from './ThemeToggle';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

export default function VaultDashboard() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  // ... your Firestore logic here ...

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Vault Dashboard</h2>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        {/* Summary Cards */}
        <VaultSummaryCards summary={summary} />

        {/ Charts Grid /}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
  {/ Merchant Net Value Chart /}
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

  {/ Referral Discounts Chart /}
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500 ease-in-out">
    <h3 className="text-lg font-semibold mb-2 text-amber-600 dark:text-amber-400 transition-colors duration-500 ease-in-out">
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
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' }} />
            </PieChart>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-8">
          <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-burgundy-500">
            Vault Totals
          </h3>
          <BarChart width={600} height={300} data={vaultData}>
            <CartesianGrid stroke={isDark ? '#444' : '#ccc'} />
            <XAxis dataKey="vaultId" stroke={isDark ? '#aaa' : '#000'} />
            <YAxis stroke={isDark ? '#aaa' : '#000'} />
            <Tooltip contentStyle={{ backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' }} />
            <Bar dataKey="amount" fill={isDark ? '#14b8a6' : '#82ca9d'} />
          </BarChart>
        </div>
      </div>
    </div>
  );
}