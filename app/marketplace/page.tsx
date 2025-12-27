export default function MarketplacePage() {
  return (
    <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center">
        Marketplace
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          Vehicles
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          Properties
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          Marketplace
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          Other
        </div>
      </div>

      {/* Listing Feed Placeholder */}
      <div className="mt-16 bg-white rounded-xl shadow p-10 text-center text-gray-500">
        Listings will appear here.
      </div>
    </div>
  );
}