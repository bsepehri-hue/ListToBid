"use client";

export default function ReferralLinkGenerator() {
  return (
    <div>
      <h3>Referral Link Generator</h3>
      <input type="text" value="https://example.com/referral/123" readOnly />
      <button>Copy Link</button>
    </div>
  );
}