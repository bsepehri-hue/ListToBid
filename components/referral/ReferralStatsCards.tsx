// components/referral/ReferralStatsCards.tsx
"use client";

export default function ReferralStatsCards() {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Referral Stats</h3>
      <ul className="space-y-1 text-gray-700">
        <li>Clicks: 0</li>
        <li>Signups: 0</li>
        <li>Earnings: $0</li>
      </ul>
    </div>
  );
}