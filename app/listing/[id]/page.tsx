import { ListingDetailClient } from "./ListingDetailClient";
mport { getListingById } from "./getListingById";



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
