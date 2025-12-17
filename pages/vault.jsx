// pages/vault.jsx
import stewards from './stewards.jsx';

export default function Vault() {
  // For now, we don’t have steward data wired up.
  // Later, you can fetch from an API or a JSON file.
  const stewards = [];

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

      {/* Render the onboarding form here */}
      <Onboarding />
    </div>
  );
}
