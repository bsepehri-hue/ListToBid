import Link from 'next/link';

export default function Home() {
  return (
    <div className="parchment p-8">
      <h1 className="text-4xl mb-6">Welcome to ListToBid</h1>
      <Link href="/onboard"><button className="btn-emerald">Become a Steward</button></Link>
      <Link href="/directory"><button className="btn-amber ml-4">Browse Merchants</button></Link>
      <Link href="/vault"><button className="btn-gold ml-4">View Earnings</button></Link>
    </div>
  );
}