import { StripeConnectActions } from '@/components/stripe/StripeConnectActions';

export default function PaymentsPage() {
  const userId = 'user_123'; // Replace with actual user ID
  const email = 'user@example.com'; // Replace with actual email

  return (
    <div className="px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
      <p className="text-sm text-gray-600">
        Connect your Stripe account to receive payouts and manage your earnings.
      </p>

      <StripeConnectActions userId={userId} email={email} />
    </div>
  );
}
{
  label: 'Payments',
  href: '/dashboard/settings/payments',
  icon: BanknotesIcon,
}