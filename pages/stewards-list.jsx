import { useEffect, useState } from "react";

export default function StewardsList() {
  const [stewards, setStewards] = useState([]);

  // Load stewards on mount
  useEffect(() => {
    async function fetchStewards() {
      const res = await fetch("/api/stewards");
      const data = await res.json();
      setStewards(data);
    }
    fetchStewards();
  }, []);

  // PATCH request to increment referrals
  async function addReferral(storeName) {
    const res = await fetch("/api/stewards", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ store_name: storeName, increment: 1 }),
    });

    const data = await res.json();

    // Update local state with new referral count
    setStewards((prev) =>
      prev.map((s) =>
        s.store_name === storeName ? { ...s, referrals: data.steward.referrals } : s
      )
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stewards Scroll</h1>
      {stewards.length === 0 ? (
        <p>No stewards onboarded yet.</p>
      ) : (
        <ul className="space-y-4">
          {stewards.map((s, i) => (
            <li key={i} className="border p-4 rounded flex justify-between items-center">
              <div>
                <strong>{s.store_name}</strong> — {s.category}
                <p>{s.description}</p>
                <small>Joined: {new Date(s.createdAt).toLocaleString()}</small>
                <p>Referrals: {s.referrals}</p>
              </div>
              <button
                onClick={() => addReferral(s.store_name)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                +1 Referral
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}