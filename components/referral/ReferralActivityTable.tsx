// components/referral/ReferralActivityTable.tsx
"use client";

export default function ReferralActivityTable() {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Referral Activity</h3>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Date</th>
            <th className="border px-2 py-1 text-left">User</th>
            <th className="border px-2 py-1 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">No data</td>
            <td className="border px-2 py-1">-</td>
            <td className="border px-2 py-1">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}