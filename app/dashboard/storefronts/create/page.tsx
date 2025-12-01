import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateStorefrontForm } from '@/components/web3/CreateStorefrontForm';

export default function CreateStorefrontPage() {
  return (
    <>
      <div className="mb-8">
        <Link href="/dashboard/stores" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stores List
        </Link>
      </div>

      <div className="mt-4">
        <CreateStorefrontForm />
      </div>
    </>
  );
}
