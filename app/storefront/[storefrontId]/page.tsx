import { StorefrontBanner } from "@/components/storefront/StorefrontBanner/StorefrontBanner";
import { StorefrontListings } from "./StorefrontListings";
import { getStorefrontData } from "./getStorefrontData"; // whatever your fetch layer is

export default async function StorefrontPage({
  params,
}: {
  params: { storefrontId: string };
}) {
  const storefrontId = params.storefrontId;

  // Fetch storefront + listings
  const data = await getStorefrontData(storefrontId);

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-20">
        Storefront not found
      </div>
    );
  }

  return (
    <div className="pb-10">
      <StorefrontBanner storefrontId={storefrontId} />

      <div className="px-6">
        <StorefrontListings listings={data.listings} />
      </div>
    </div>
  );
}

