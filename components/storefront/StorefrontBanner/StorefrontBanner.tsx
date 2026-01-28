import { ThreeDotMenu } from "@/components/common/ThreeDotMenu";
import { RatingStars } from "@/components/common/RatingStars";
import { StorefrontBannerSkeleton } from "./StorefrontBannerSkeleton";
import { useStorefrontBanner } from "./useStorefrontBanner";

export function StorefrontBanner({ storefrontId }: { storefrontId: string }) {
  const { data, isLoading, isError, isCompressed } =
    useStorefrontBanner(storefrontId);

  if (isLoading) return <StorefrontBannerSkeleton />;
  if (isError || !data) return null;

  const {
    storeName,
    tagline,
    location,
    bannerImageUrl,
    brandColor,
    rating,
    reviewCount,
    isFollowedByCurrentUser,
  } = data;

  const bgStyle = bannerImageUrl
    ? {
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(135deg, ${
          brandColor ?? "#008080"
        } 0%, ${brandColor ?? "#008080"}B3 100%)`,
      };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isCompressed ? "h-[72px]" : "h-[260px]"
      } relative rounded-md overflow-hidden`}
      style={bgStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Foreground */}
      <div className="relative z-10 h-full flex justify-between items-end px-6 pb-6">
        {/* Left Block */}
        <div className="flex flex-col max-w-[60%]">
          <h1
            className={`text-white font-bold ${
              isCompressed ? "text-xl" : "text-4xl"
            } truncate`}
          >
            {storeName}{!isCompressed && rating && (
  <RatingStars rating={rating} reviewCount={reviewCount} />
)}

            
          </h1>

          {!isCompressed && tagline && (
            <p className="text-white/80 text-lg truncate">{tagline}</p>
          )}

          {!isCompressed && location && (
            <p className="text-white/70 text-sm">
              {location.city}, {location.state}
            </p>
          )}
        </div>

        {/* Right Block */}
        <div className="flex gap-3">
  {/* Follow button always visible */}
  <button className="bg-black/40 text-white px-4 py-2 rounded-lg">
    {isFollowedByCurrentUser ? "Following" : "Follow"}
  </button>

  {/* Desktop actions */}
  <div className="hidden sm:flex gap-3">
    {!isCompressed && (
      <>
        <button className="bg-black/40 text-white px-4 py-2 rounded-lg">
          Share
        </button>
        <button className="bg-black/40 text-white px-4 py-2 rounded-lg">
          Contact
        </button>
      </>
    )}
  </div>

  {/* Mobile 3-dot menu */}
  <div className="sm:hidden">
    <ThreeDotMenu>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
        Share
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
        Contact
      </button>
    </ThreeDotMenu>
  </div>
</div>

          </button>

          {!isCompressed && (
            <>
              <button className="bg-black/40 text-white px-4 py-2 rounded-lg">
                Share
              </button>
              <button className="bg-black/40 text-white px-4 py-2 rounded-lg">
                Contact
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
