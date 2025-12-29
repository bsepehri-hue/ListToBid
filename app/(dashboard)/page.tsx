export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Your marketplace command center.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStat label="Active Storefronts" value="0" />
        <DashboardStat label="Active Listings" value="0" />
        <DashboardStat label="Unread Messages" value="0" />
        <DashboardStat label="Pending Payouts" value="$0.00" />
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAction label="Create Storefront" href="/dashboard/storefronts/create" />
          <QuickAction label="New Listing" href="/dashboard/storefronts" />
          <QuickAction label="Messages" href="/dashboard/messages" />
        </div>
      </div>
    </div>
  );
}

function DashboardStat({ label, value }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function QuickAction({ label, href }) {
  return (
    <a
      href={href}
      className="p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
    >
      <p className="font-medium">{label}</p>
    </a>
  );
}