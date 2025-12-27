import React from 'react';
import { ReferralActivity, getReferralActivityIcon, ReferralActivityType } from '@/lib/mockData/referrals';
import { formatEther, shortenAddress } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface ReferralActivityTableProps {
  activity: ReferralActivity[];
}

const getActivityColor = (type: ReferralActivityType) => {
    switch(type) {
        case 'BID': return 'bg-teal-100 text-teal-700';
        case 'LISTING_FEE': return 'bg-green-100 text-green-700';
        case 'SIGNUP': return 'bg-purple-100 text-purple-700';
        case 'PAYOUT_CLAIM': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-gray-100 text-gray-700';
    }
}

export const ReferralActivityTable: React.FC<ReferralActivityTableProps> = ({ activity }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

      <div className="p-4 border-b border-gray-100 flex items-center">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-600" /> Recent Referral Ledger
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Earned (ETH)</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Referral ID</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activity.map((act) => {
              const Icon = getReferralActivityIcon(act.type);
              const colorClass = getActivityColor(act.type);

              return (
                <tr key={act.id} className="hover:bg-gray-50 transition duration-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {act.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {act.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-700">
                    +{formatEther(act.amountEarned)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-teal-600">
                    {act.referralId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {act.timestamp.toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {activity.length === 0 && (
          <p className="p-6 text-center text-gray-500 italic">No referral activity recorded yet.</p>
      )}
    </div>
  );
};