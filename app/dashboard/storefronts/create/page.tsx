import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateStorefrontForm } from "@/components/web3/CreateStorefrontForm";

export default function CreateStorefrontPage() {
  return (
    <>
      <div className="mb-8">
        <Link
          href="/dashboard/storefronts"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Storefronts
        </Link>
      </div>

      <div className="mt-4">
        <CreateStorefrontForm />
      </div>
    </>
  );
}
