"use client";

import React from "react";
import { VaultSummary } from "@/lib/vault/types";

interface Props {
  summary: VaultSummary;
}

export const VaultSummaryCards: React.FC<Props> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Balance */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Current Balance
        </h3>
        <p className="mt-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
          {summary.totalBalance.toLocaleString()} {summary.currency}
        </p>
      </div>

      {/* Pending Payouts */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Pending Payouts
        </h3>
        <p className="mt-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
          {/* Example: derive from entries tagged as payouts */}
          {summary.entries
            .filter((e) => e.amount < 0)
            .reduce((sum, e) => sum + e.amount, 0)
            .toLocaleString()}{" "}
          {summary.currency}
        </p>
      </div>

      {/* Lifetime Earnings */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Lifetime Earnings
        </h3>
        <p className="mt-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
          {summary.entries
            .filter((e) => e.amount > 0)
            .reduce((sum, e) => sum + e.amount, 0)
            .toLocaleString()}{" "}
          {summary.currency}
        </p>
      </div>

      {/* Total Fees Paid */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Fees Paid
        </h3>
        <p className="mt-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
          {/* Example: derive from entries tagged as fees */}
          {summary.entries
            .filter((e) => e.amount < 0) // adjust if you track fees separately
            .reduce((sum, e) => sum + e.amount, 0)
            .toLocaleString()}{" "}
          {summary.currency}
        </p>
      </div>
    </div>
  );
};