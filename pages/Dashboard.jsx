import { mockDashboardData } from "../data/mockDashboardData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import SalesChart from "../components/SalesChart";
import ReferralsChart from "../components/ReferralsChart";
import PayoutsLedger from "../components/PayoutsLedger";

export default function Dashboard() {
  const { sales, referrals, payouts } = mockDashboardData;

  // Simulate loading state (replace with real API fetch later)
  const isLoading = false; // toggle true to test spinner

  if (isLoading) {
    return (
      <div className="dashboard-container p-6 flex items-center justify-center h-screen">
        <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
        <p className="ml-4 text-lg font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container p-6">
      {/* Header Stats */}
      <div className="header-stats grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Sales</h3>
          <p className="text-xl font-bold">
            {sales?.length ? `$${sales.reduce((acc, s) => acc + s.gross, 0)}` : "—"}
          </p>
        </div>
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Referrals</h3>
          <p className="text-xl font-bold">
            {referrals?.length ? referrals.reduce((acc, r) => acc + r.count, 0) : "—"}
          </p>
        </div>
        <div className="stat-card bg-white shadow rounded p-4">
          <h3 className="text-sm font-semibold">Payouts</h3>
          <p className="text-xl font-bold">
            {payouts?.length ? `$${payouts.reduce((acc, p) => acc + p.amount, 0)}` : "—"}
          </p>
        </div>
      </div>

      {/* Sales Chart */}
      {sales?.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gross" stroke="#0d9488" name="Gross Sales" />
              <Line type="monotone" dataKey="net" stroke="#10b981" name="Net Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500">No sales data available.</p>
      )}

      {/* Referrals Chart */}
      {referrals?.length > 0 ? (
        <div className="mb-6">
          <ReferralsChart data={referrals} />
        </div>
      ) : (
        <p className="text-gray-500">No referral data available.</p>
      )}

      {/* Payouts Ledger */}
      {payouts?.length > 0 ? (
        <div className="mb-6">
          <PayoutsLedger data={payouts} />
        </div>
      ) : (
        <p className="text-gray-500">No payouts recorded.</p>
      )}
    </div>
  );
}