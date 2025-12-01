import React from 'react';
import { FormWrapper } from './FormWrapper';
import { PayoutSettings } from '@/lib/mockData/settings';
import { updatePayoutSettings } from '@/actions/settings';
import { StripeConnectActions } from '../vault/StripeConnectActions'; // Reuse Stripe actions
import { shortenAddress } from '@/lib/utils';

interface PayoutsSectionProps {
  settings: PayoutSettings;
}

const FREQUENCIES = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
];

export const PayoutsSection: React.FC<PayoutsSectionProps> = ({ settings }) => {
  const initialState = { success: false, message: '' };

  return (
    <FormWrapper
      action={updatePayoutSettings}
      initialState={initialState}
      title="Payouts & Financial Preferences"
      description="Configure your preferred token for smart contract payouts and set settlement frequency."
    >
        <div className="space-y-6">
            {/* Fiat Payout Integration (Stripe) */}
            <div className="border border-teal-300 p-4 rounded-xl bg-teal-50 shadow-inner">
                <h4 className="font-semibold text-teal-800 mb-2">Fiat Payouts (Stripe Connect)</h4>
                <StripeConnectActions />
            </div>

            {/* Crypto Payout Preferences */}
            <div>
                <label htmlFor="preferredToken" className="block text-sm font-medium text-gray-700 mb-1">Preferred Payout Token (WETH Address)</label>
                <input id="preferredToken" name="preferredToken" type="text" required defaultValue={settings.preferredToken} className="w-full p-3 border border-gray-300 rounded-lg font-mono" />
                <p className="text-xs text-gray-500 mt-1">Current Mock WETH Address: {shortenAddress(settings.preferredToken, 8)}</p>
            </div>
            
            {/* Frequency Selector */}
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Settlement Frequency</label>
              <select id="frequency" name="frequency" defaultValue={settings.frequency} className="w-full p-3 border border-gray-300 rounded-lg">
                {FREQUENCIES.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                ))}
              </select>
            </div>
        </div>
    </FormWrapper>
  );
};
