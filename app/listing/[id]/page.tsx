import { ListingDetailClient } from "./ListingDetailClient";

export default async function Page({ params }) {
  const listing = await getListing(params.id);

  return (
    <div className="pb-20">
      <ListingDetailClient listing={listing} />
    </div>
  );
}
