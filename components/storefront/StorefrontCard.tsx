import { StorefrontData } from '@/lib/web3/dataFetcher'; 
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Tag } from 'lucide-react';
// Assuming shortenAddress utility is available from previous step
import { shortenAddress } from '@/lib/utils'; 

interface StorefrontCardProps {
  store: StorefrontData;
}

export const StorefrontCard: React.FC<StorefrontCardProps> = ({ store }) => {
  const listingsCount = store.totalListings.toString();
  // Construct the link based on the storefront ID
  const storeLink = `/marketplace/${store.id.toString()}`;

  return (
    <Link 
      href={storeLink}
      className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100"
    >
      {/* Profile Image / Banner Area */}
      <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
        <Image
          src={store.profileDataUri || 'https://placehold.co/400x200/024c05/white?text=ListToBid+Store'}
          alt={`${store.name} Storefront Banner`}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition duration-500 group-hover:opacity-80"
          onError={(e) => {
            // Fallback for failed image loads
            (e.target as HTMLImageElement).onerror = null; 
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x200/024c05/white?text=ListToBid+Store';
          }}
        />
      </div>

      <div className="p-5">
        {/* Store Name */}
        <h3 className="text-2xl font-bold text-gray-900 truncate mb-2 group-hover:text-teal-600 transition">
          {store.name}
        </h3>

        {/* Owner Wallet Address */}
        <p className="text-sm text-gray-500 flex items-center mb-4">
          <Tag className="w-4 h-4 mr-2 text-gray-400" />
          Owner: {shortenAddress(store.owner)}
        </p>
        
        {/* Statistics and Call-to-Action */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <ShoppingBag className="w-4 h-4 mr-2 text-teal-600" />
            Active Listings
          </div>
          <span className="text-lg font-extrabold text-teal-600">
            {listingsCount}
          </span>
        </div>
      </div>
    </Link>
  );
};
