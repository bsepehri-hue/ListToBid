import React from "react";
import { FormWrapper } from "./FormWrapper";
import { StripeConnectActions } from "@/components/StripeConnectActions";
import { shortenAddress } from "@/lib/utils";
import { FREQUENCIES } from "@/constants";
import { SettingsFormState } from "@/actions/settings/settingsActions";


interface PayoutPreferencesProps {
  settings: {
    preferredToken: string;
    frequency: string;
  };
  updatePayoutSettings: (formData: FormData) => Promise<any>;
  initialState: SettingsFormState;
}

export default function PayoutPreferences({
  settings,
  updatePayoutSettings,
  initialState,
}: PayoutPreferencesProps) {
  return (
  <FormWrapper
  action={async (
    prevState: SettingsFormState,
    formData: FormData
  ): Promise<SettingsFormState> => {
    // … your payout logic …
    return {
      success: true,
      message: "Payout preferences updated successfully",
    };
  }}
/>
        return {
          ...prevState,
          preferredToken:
            formData.get("preferredToken")?.toString() ??
            prevState.preferredToken,
          frequency:
            formData.get("frequency")?.toString() ?? prevState.frequency,
          success: true,
        };
      }}
      initialState={initialState}
      title="Payouts & Financial Preferences"
      description="Configure your preferred token for smart contract payouts and set settlement frequency."
    >
      <div className="space-y-6">
        {/* Fiat Payout Integration (Stripe) */}
        <div className="border border-teal-300 p-4 rounded-xl bg-teal-50 shadow-inner">
          <h4 className="font-semibold text-teal-800 mb-2">
            Fiat Payouts (Stripe Connect)
          </h4>
          <StripeConnectActions />
        </div>

        {/* Token Payout Integration */}
        <div className="border border-emerald-300 p-4 rounded-xl bg-emerald-50 shadow-inner">
          <label
            htmlFor="preferredToken"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Payout Token (WETH Address)
          </label>
          <input
            id="preferredToken"
            name="preferredToken"
            type="text"
            required
            defaultValue={settings.preferredToken}
            className="w-full p-3 border border-gray-300 rounded-lg font-mono"
          />

          {settings.preferredToken ? (
            <p className="text-xs text-gray-500 mt-1">
              Current Mock WETH Address:{" "}
              {shortenAddress(settings.preferredToken, 8)}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">No token set</p>
          )}
        </div>

        {/* Frequency Selector */}
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Settlement Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            defaultValue={settings.frequency}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {FREQUENCIES.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormWrapper>
  );
}