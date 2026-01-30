import { getListingById } from "./getListingById";
import { ShareModal } from "@/components/modals/ShareModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { RatingStars } from "@/components/common/RatingStars";
import { useState } from "react";
import ListingDetailClient from "@/app/components/ListingDetailClient";

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listingId = params.id;
  const listing = await getListingById(listingId);

  if (!listing) {
    return (
      <div className="text-center text-gray-500 py-20">
        Listing not found
      </div>
    );
  }

  return (
    <div className="pb-20">
      <ListingDetailClient listing={listing} />
    </div>
  );
}
