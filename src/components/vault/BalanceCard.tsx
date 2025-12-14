"use client";

import React from "react";
import { VaultEntry } from "@/lib/vault/types";

interface Props {
  entry: VaultEntry;
}

const BalanceCard: React.FC<Props> = ({ entry }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Steward
      </h3>
      <p className="mt-1 text-lg font-semibold text-teal-600 dark:text-teal-400">
        {entry.stewardId}
      </p>

      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
        Amount
      </h3>
      <p className="mt-1 text-2xl font-bold text-teal-600 dark:text-teal-400">
        {entry.amount.toLocaleString()} {entry.currency}
      </p>

      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
        Created At
      </h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        {entry.createdAt.toLocaleDateString()}
      </p>
    </div>
  );
};

export default BalanceCard;