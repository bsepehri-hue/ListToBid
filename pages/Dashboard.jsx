// Dashboard.jsx

import React from "react";
import { Card, Badge } from "./ui"; // assuming you have reusable UI components

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Header Stats */}
      <div className="header-stats grid grid-cols-3 gap-4 mb-6">
        <Card>
          <h3 className="text-sm font-semibold">Sales</h3>
          <p className="text-xl font-bold">$12,340</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold">Referrals</h3>
          <p className="text-xl font-bold">128</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold">Payouts</h3>
          <p className="text-xl font-bold">$4,560</p>
        </Card>
      </div>

      {/* Storefront Cards */}
      <div className="storefront-grid grid grid-cols-3 gap-6">
        <Card>
          <h4 className="text-lg font-semibold">Boutique A</h4>
          <Badge color="emerald">Live</Badge>
          <Badge color="amber">Referral</Badge>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold">Boutique B</h4>
          <Badge color="emerald">Live</Badge>
          <Badge color="burgundy">Ends Soon</Badge>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold">Boutique C</h4>
          <Badge color="amber">Referral</Badge>
        </Card>
      </div>
    </div>
  );
}