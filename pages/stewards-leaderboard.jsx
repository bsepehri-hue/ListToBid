import { useEffect, useState } from "react";

export default function StewardsLeaderboard() {
  const [stewards, setStewards] = useState([]);

  useEffect(() => {
    async function fetchStewards() {
      const res = await fetch("/api/stewards");
      const data = await res.json();

      // Sort by referrals descending
      const sorted = [...data].sort((a, b) => b.referrals - a.referrals);
      setStewards(sorted);
    }
    fetchStewards();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Stewards Leaderboard</h1>
      {stewards.length === 0 ? (
        <p>No stewards onboarded yet.</p>
      ) : (
        <ol className="space-y-4 list-decimal list-inside">
          {stewards.map((s, i) => (
            <li key={i} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{s.store_name}</strong> — {s.category}
                  <p>{s.description}</p>
                  <small>Joined: {new Date(s.createdAt).toLocaleString()}</small>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded">
                  Referrals: {s.referrals}
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}