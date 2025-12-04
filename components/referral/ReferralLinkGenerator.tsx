// components/referral/ReferralLinkGenerator.tsx
"use client";

export default function ReferralLinkGenerator() {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Referral Link Generator</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value="https://example.com/referral/123"
          readOnly
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}