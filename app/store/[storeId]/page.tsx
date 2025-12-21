import Image from "next/image";
import Link from "next/link";

type StorePageProps = {
  params: {
    storeId: string;
  };
};

const mockStore = {
  id: "demo-store",
  name: "Demo Store",
  logoUrl: "/images/demo-store-logo.png", // put your logo into /public/images
  description: "Handpicked deals, curated auctions, and trusted fulfillment.",
};

const mockProducts = [
  {
    id: "prod-1",
    name: "Sample Product One",
    price: 49.99,
    imageUrl: "/images/sample-product-1.jpg",
  },
  {
    id: "prod-2",
    name: "Sample Product Two",
    price: 79.99,
    imageUrl: "/images/sample-product-2.jpg",
  },
  {
    id: "prod-3",
    name: "Sample Product Three",
    price: 29.99,
    imageUrl: "/images/sample-product-3.jpg",
  },
];

const mockAuctions = [
  {
    id: "auc-1",
    title: "Limited Edition Collectible",
    currentBidEth: 0.42,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // +6h
  },
  {
    id: "auc-2",
    title: "Signed Merch Bundle",
    currentBidEth: 0.18,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +24h
  },
];

export default function StorePage({ params }: StorePageProps) {
  const { storeId } = params;

  // Later: fetch real store by storeId from Firestore
  const store = mockStore;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Store header */}
        <section className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-200">
            <Image
              src={store.logoUrl}
              alt={`${store.name} logo`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {store.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {store.description}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Store ID: <span className="font-mono">{storeId}</span>
            </p>
          </div>
        </section>

        {/* Products section */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Products
            </h2>
            <Link
              href="#"
              className="text-xs font-medium text-teal-700 hover:text-teal-900"
            >
              View all
            </Link>
          </div>

          {mockProducts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No products listed yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/store/${store.id}/product/${product.id}`}
                  className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:border-teal-500 hover:shadow-md transition"
                >
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="line-clamp-2 text-sm font-medium text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-teal-700">
                    ${product.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Auctions section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Live & Upcoming Auctions
            </h2>
            <Link
              href="#"
              className="text-xs font-medium text-teal-700 hover:text-teal-900"
            >
              View all auctions
            </Link>
          </div>

          {mockAuctions.length === 0 ? (
            <p className="text-sm text-slate-500">
              No auctions are active for this store.
            </p>
          ) : (
            <div className="space-y-3">
              {mockAuctions.map((auction) => (
                <Link
                  key={auction.id}
                  href={`/auction/${auction.id}`}
                  className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-amber-500 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">
                        {auction.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Ends:{" "}
                        {new Date(auction.endsAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Current bid
                      </p>
                      <p className="text-sm font-semibold text-amber-600">
                        {auction.currentBidEth.toFixed(3)} ETH
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}