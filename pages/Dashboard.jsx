// pages/Dashboard.jsx

import React from "react";
import { mockDashboardData } from "../data/mockDashboardData";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { sales, referrals, payouts } = mockDashboardData;
  // render charts/cards here
}
return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="gross" stroke="#0d9488" name="Gross Sales" />
        <Line type="monotone" dataKey="net" stroke="#10b981" name="Net Sales" />
      </LineChart>
    </ResponsiveContainer>
  );
}


    <div className="dashboard-container p-6">
      {/* Header Stats */}
      <div className="header-stats grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Sales</h3>
          <p className="text-xl font-bold">$0</p>
        </div>
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Referrals</h3>
          <p className="text-xl font-bold">0</p>
        </div>
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Payouts</h3>
          <p className="text-xl font-bold">$0</p>
        </div>
      </div>

      {/* Storefront Cards */}
      <div className="storefront-grid grid grid-cols-3 gap-6">
        <div className="storefront-card bg-white shadow rounded p-4">
          <h4 className="text-lg font-semibold">Boutique A</h4>
          <span className="badge bg-emerald-500 text-white px-2 py-1 rounded">Live</span>
        </div>
        <div className="storefront-card bg-white shadow rounded p-4">
          <h4 className="text-lg font-semibold">Boutique B</h4>
          <span className="badge bg-amber-500 text-white px-2 py-1 rounded">Referral</span>
        </div>
        <div className="storefront-card bg-white shadow rounded p-4">
          <h4 className="text-lg font-semibold">Boutique C</h4>
          <span className="badge bg-burgundy-600 text-white px-2 py-1 rounded">Ends Soon</span>
        </div>
      </div>
    </div>
  );
}