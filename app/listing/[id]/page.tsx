import { ListingDetailClient } from "./ListingDetailClient";
import { getListingById } from "./getListingById";



export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getListing(params.id);

  return (
    <div className="pb-20">
      <ListingDetailClient listing={listing} />
    </div>
  );
}
