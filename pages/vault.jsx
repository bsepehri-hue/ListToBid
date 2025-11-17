import fs from 'fs';
import path from 'path';

export default function Vault({ stewards }) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl mb-6">Steward Vault</h1>
      {stewards.length === 0 ? (
        <p>No stewards found.</p>
      ) : (
        <ul className="space-y-4">
          {stewards.map((s, i) => (
            <li key={i} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{s.store_name}</h2>
              <p><strong>Category:</strong> {s.category}</p>
              <p><strong>Description:</strong> {s.description}</p>
              <p><strong>Joined:</strong> {new Date(s.createdAt).toLocaleDateString()}</p>
              <p><strong>Referral Earnings:</strong> {s.referrals ? `${s.referrals * 2}%` : '0%'}</p>
              <p><strong>Strike Count:</strong> 0</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'stewards.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const stewards = JSON.parse(data);
  return { props: { stewards } };
}