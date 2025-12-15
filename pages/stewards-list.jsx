import { useEffect, useState } from "react";

export default function StewardsList() {
  const [stewards, setStewards] = useState([]);

  useEffect(() => {
    async function fetchStewards() {
      const res = await fetch("/api/stewards");
      const data = await res.json();
      setStewards(data);
    }
    fetchStewards();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stewards Scroll</h1>
      {stewards.length === 0 ? (
        <p>No stewards onboarded yet.</p>
      ) : (
        <ul className="space-y-2">
          {stewards.map((s, i) => (
            <li key={i} className="border p-2 rounded">
              <strong>{s.store_name}</strong> — {s.category}
              <p>{s.description}</p>
              <small>Joined: {new Date(s.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}