import { StorefrontCard } from '@/components/ui/StorefrontCard';
import { fetchAllStorefronts, StorefrontData } from '@/lib/web3/dataFetcher';
import { LayoutGrid, AlertTriangle } from 'lucide-react';
import { Suspense } from 'react';

// Use a Server Component to fetch data directly
export default async function MarketplacePage() {
  
  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      
      {/* Header and Title Block */}
      <div className="mb-10 flex items-center justify-between border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <LayoutGrid className="w-8 h-8 mr-3 text-teal-600" />
          The ListToBid Marketplace
        </h1>
        <p className="text-gray-500 hidden md:block">
          Discover storefronts and unique listings on Polygon Amoy.
        </p>
      </div>

      {/* Use Suspense for loading state while fetching blockchain data */}
      <Suspense fallback={<MarketplaceLoading />}>
        {/* Fetcher component handles the async logic */}
        <MarketplaceFetcher />
      </Suspense>

    </div>
  );
}

// Component to handle the async fetching logic and rendering
async function MarketplaceFetcher() {
    let storefronts: StorefrontData[] = [];
    let error: string | null = null;
    
    try {
        storefronts = await fetchAllStorefronts();
    } catch (e) {
        console.error("Failed to load marketplace data:", e);
        error = "Failed to load marketplace data from the blockchain.";
    }

    return (
        <>
            {/* Error Handling UI */}
            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-3 mb-8">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{error} Showing mock data for demonstration.</p>
                </div>
            )}

            {/* Storefront Grid or Empty State */}
            {storefronts.length === 0 && !error ? (
                <div className="text-center p-20 bg-white rounded-xl shadow-lg">
                    <p className="text-gray-500 text-xl font-medium">
                        No storefronts found. Be the first to create one!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {storefronts.map((store) => (
                    <StorefrontCard key={store.id.toString()} store={store} />
                ))}
                </div>
            )}
        </>
    );
}

// Simple Loading Skeleton
function MarketplaceLoading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden h-96">
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
