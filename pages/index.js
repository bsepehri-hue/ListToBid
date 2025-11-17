import Link from 'next/link';

export default function Home() {
  return (
    <div className="parchment p-8">
      <h1 className="text-4xl mb-6">Welcome to ListToBid</h1>

      {/* Steward Onboarding */}
      <Link href="/onboarding" className="btn-emerald">
        Become a Steward
      </Link>

      {/* Merchant Directory */}
      <Link href="/directory" className="btn-amber ml-4">
        Browse Merchants
      </Link>

      {/* Vault Earnings */}
      <Link href="/vault" className="btn-gold ml-4">
        View Earnings
      </Link>
    </div>
  );
}