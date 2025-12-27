import StorefrontDashboardClient from "./StorefrontDashboardClient";

export default function StorefrontDashboardPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome Back, Store Owner!
      </h1>

      <section className="storefronts">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
          Your Active Storefronts
        </h2>

        <StorefrontDashboardClient />
      </section>
    </div>
  );
}