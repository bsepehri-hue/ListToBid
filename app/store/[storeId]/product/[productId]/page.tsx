export default function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const { storeId, productId } = params;

  // Temporary mock product — we replace this with Firestore later
  const product = {
    id: productId,
    title: "Sample Product",
    price_in_cents: 4999,
    description: "This is a placeholder product description.",
    image: "/images/sample-product-1.jpg",
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full rounded-lg mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

      <p className="text-2xl text-emerald-700 mb-6">
        ${(product.price_in_cents / 100).toFixed(2)}
      </p>

      <p className="text-lg text-gray-700 mb-12">{product.description}</p>

      <button className="w-full py-4 text-xl bg-amber-500 text-white rounded-lg">
        Buy Now
      </button>
    </div>
  );
}