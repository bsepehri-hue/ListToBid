import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, User, Store, Tag, AlertTriangle } from 'lucide-react';
import { AuctionData } from "@/types/auction";
import { formatEther, shortenAddress, formatDuration } from '@/lib/utils';
import { BiddingForm } from '@/components/auction/BiddingForm';
import { BidHistory } from '@/components/auction/BidHistory';
import { mockBidHistory } from '@/lib/mockData/auction';
import { generateShareableAuctionLink } from '@/lib/links';
import { ShareButton } from '@/lib/hooks/useClipboard';
import { Card } from '@/components/ui/Card';

// Countdown Timer Component (Client Component)
const AuctionCountdown: React.FC<{ endTime: bigint }> = ({ endTime }) => {
  const endTimeInMs = Number(endTime) * 1000;
  const [timeLeft, setTimeLeft] = React.useState(
    Math.max(0, Math.floor((endTimeInMs - Date.now()) / 1000))
  );

  const isAuctionOver = timeLeft === 0;

  React.useEffect(() => {
    if (isAuctionOver) return;
    const timer = setInterval(() => {
      const remainingSeconds = Math.max(0, Math.floor((endTimeInMs - Date.now()) / 1000));
      setTimeLeft(remainingSeconds);
      if (remainingSeconds === 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTimeInMs, isAuctionOver]);

  return (
    <Card 
      padding="default"
      className={`!p-4 text-white font-extrabold text-center transition-all duration-300 shadow-xl
        ${isAuctionOver ? 'bg-red-600' : timeLeft < 3600 ? 'bg-orange-500' : 'bg-teal-600'}
      `}
    >
      <div className="text-xs uppercase tracking-widest mb-1 flex items-center justify-center">
        <Clock className="w-4 h-4 mr-1" />
        {isAuctionOver ? 'Auction Ended' : 'Time Remaining'}
      </div>
      <div className="text-4xl">
        {isAuctionOver ? '00:00:00' : formatDuration(timeLeft)}
      </div>
    </Card>
  );
};

interface AuctionDetailProps {
  auction: AuctionData;
  userAddress?: string | null; 
}

const AuctionDetailClientWrapper: React.FC<AuctionDetailProps> = ({ auction, userAddress }) => {
  const shareLink = generateShareableAuctionLink(
    auction.auctionId?.toString() ?? "",
    userAddress || undefined
  );

  const currentBidEther = formatEther(auction.currentBid ?? 0n);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">

      {/* Back Link */}
      <Link href="/auctions" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Live Auctions
      </Link>

      {/* Auction Title & Share Button */}
      <div className="flex justify-between items-start border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 pr-4">
          {auction.listingName ?? "Untitled Auction"}
        </h1>
        <ShareButton linkToCopy={shareLink} text="Share & Earn Ref Rewards" />
      </div>

      {/* Main Layout: Left (image/details), Right (bidding/history) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left side: Item Image and Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Item Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-gray-100">
            <Image
              src={auction.itemUri ?? "https://placehold.co/800x600/024c05/white?text=Listing+Asset"}
              alt={auction.listingName ?? "Untitled Auction"}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              style={{ objectFit: 'cover' }}
              className="transition duration-500 hover:scale-105"
            />
          </div>

          {/* Core Auction Details */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900">Item Description</h2>
            <div className="text-gray-600 space-y-3">
              <p>This is a placeholder for the full item description, which would typically be fetched via the `itemUri` or a separate metadata call.</p>

              <ul className="grid grid-cols-2 gap-4 pt-4 border-t">
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 mr-2 text-teal-600" />
                  Auction ID: <span className="ml-1 font-semibold">{auction.auctionId?.toString() ?? "Unknown"}</span>
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <Store className="w-4 h-4 mr-2 text-teal-600" />
                  Storefront: 
                  <Link href={`/marketplace/${auction.storefrontId?.toString() ?? ""}`} className="ml-1 text-teal-600 hover:underline">
                    #{auction.storefrontId?.toString() ?? "Unknown"}
                  </Link>
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2 text-teal-600" />
                  Seller: <span className="ml-1 font-mono">{shortenAddress(auction.sellerAddress ?? "0x0", 6)}</span>
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2 text-teal-600" />
                  Highest Bidder: <span className="ml-1 font-mono">{shortenAddress(auction.highestBidder ?? "0x0", 6)}</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Right side: Bidding and History */}
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <Card borderColor="teal">
              <p className="text-md font-semibold text-gray-500">Current Highest Bid</p>
              <p className="text-5xl font-extrabold text-gray-900 mt-1">
                {currentBidEther} <span className="text-xl text-teal-600 font-semibold">ETH</span>
              </p>
            </Card>
            <AuctionCountdown endTime={auction.endTime ?? 0n} />
          </div>

          <BiddingForm auction={auction} />
          <BidHistory bids={mockBidHistory} />
        </div>

      </div>
    </div>
  );
};

export default async function AuctionDetailPage({ params }: { params: { id: string } }) {
  let auction: AuctionData;
  try {
    auction = await fetchAuctionById(params.id);
  } catch (error) {
    return (
      <Card borderColor="red" className="p-8 text-center mt-8">
        <AlertTriangle className="w-10 h-10 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-800">Auction Not Found</h1>
        <p className="text-gray-600 mt-2">
          Could not load auction ID: {params.id}. Check the contract data or try again.
        </p>
        <Link
          href="/auctions"
          className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Live Auctions
        </Link>
      </Card>
    );
  }

  return <AuctionDetailClientWrapper auction={auction} userAddress={null} />;
}