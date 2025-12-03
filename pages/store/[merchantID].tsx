import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MerchantBazaar() {
  const router = useRouter();
  const { merchantID } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (merchantID) {
      fetch(`/api/stewards/${merchantID}`)
        .then(res => res.json())
        .then(setData);
    }
  }, [merchantID]);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: 'var(--color-parchment)' }}>
      {/* Steward Banner/Info */}
      <header className="text-center p-12">
        <img src={data.steward.logo_url} alt="" className="w-24 h-24 rounded-full mx-auto mb-4" />
        <h1 className="text-4xl">{data.steward.store_name}</h1>
        <p className="text-lg mt-2">{data.steward.description}</p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {data.products.map(product => (
          <div key={product.id} className="border border-amber-200 rounded-lg p-4 bg-white">
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p>${(product.price_in_cents / 100).toFixed(2)}</p>
            <button className="btn-mythic btn-amber mt-4">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}