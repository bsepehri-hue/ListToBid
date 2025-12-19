import { FormWrapper } from "./FormWrapper";
import { StripeConnectActions } from "@/components/StripeConnectActions";
import { SettingsFormState, updatePayoutSettings, UserSettings } 
  from "@/actions/settings/settingsActions";

type PayoutPreferencesProps = {
  settings: UserSettings;
  updatePayoutSettings: typeof updatePayoutSettings;
  initialState: SettingsFormState;
};

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
        return {
          success: true,
          message: "Payout preferences updated successfully",
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
          <StripeConnectActions
            userId={settings.userId}
            email={settings.email}
          />
        </div>

          settings: UserSettings;
  updatePayoutSettings: typeof updatePayoutSettings;
  initialState: SettingsFormState;
};

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
        return {
          success: true,
          message: "Payout preferences updated successfully",