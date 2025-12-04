// app/marketplace/page.tsx
import { Suspense } from "react";
import { LayoutGrid, AlertTriangle, Gavel } from "lucide-react";
import { StorefrontCard } from "@/components/storefront/StorefrontCard";
import { fetchAllStorefronts, StorefrontData } from "@/lib/web3/dataFetcher";
import { StewardLinks } from "./StewardLinks"; // separate client component

// Server Component: main marketplace page
export default function MarketplacePage() {
  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <LayoutGrid className="w-8 h-8 mr-3 text-teal-600" />
          The ListToBid Marketplace
        </h1>
        <p className="text-gray-500 hidden md:block">
          Discover storefronts and unique listings on Polygon Amoy.
        </p>
      </div>

      {/* Storefronts */}
      <Suspense fallback={<MarketplaceLoading />}>
        <MarketplaceFetcher />
      </Suspense>

      {/* Steward links */}
      <StewardLinks />

      {/* Auction Gallery */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Gavel className="w-6 h-6 mr-2 text-amber-600" />
          Auction Gallery
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">
          Public auction listings will appear here.
          <br />
          Bidding and form submissions require login.
        </div>
      </section>
    </div>
  );
}

// Async server component to fetch storefronts
async function MarketplaceFetcher() {
  let storefronts: StorefrontData[] = [];
  let error: string | null = null;

  try {
    storefronts = await fetchAllStorefronts();
  } catch (e) {
    console.error("Failed to load marketplace data:", e);
    error = "Failed to load marketplace data from the blockchain.";
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-3 mb-8">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium">{error} Showing mock data for demonstration.</p>
      </div>
    );
  }

  if (storefronts.length === 0) {
    return (
      <div className="text-center p-20 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500 text-xl font-medium">
          No storefronts found. Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {storefronts.map((store) => (
        <StorefrontCard key={store.id.toString()} store={store} />
      ))}
    </div>
  );
}

// Loading skeleton
function MarketplaceLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden h-96"
        >
          <div className="h-40 bg-gray-200"></div>
          <div className="p-5 space-y-4">
            <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            <div className="pt-3 border-t border-gray-100">
              <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}