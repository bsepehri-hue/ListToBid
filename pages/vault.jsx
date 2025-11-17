// pages/vault.jsx
import stewardsRaw from '../data/stewards.json';

const stewards = Array.isArray(stewardsRaw)
  ? stewardsRaw
  : stewardsRaw
    ? [stewardsRaw]
    : [];

export default function Vault() {
  const hasData = Array.isArray(stewards) && stewards.length > 0;

  return (
    <div>
      <h1>Vault</h1>
      {!hasData ? (
        <p>No stewards yet.</p>
      ) : (
        <ul className="space-y-4">
          {stewards.map((s, i) => (
            <li key={i} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{s.store_name}</h2>
              <p><strong>Category:</strong> {s.category}</p>
              {s.description && <p>{s.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
