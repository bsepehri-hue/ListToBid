// components/auction/BiddingForm.tsx
"use client";

export default function BiddingForm() {
  return (
    <form className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Enter bid"
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Place Bid
      </button>
    </form>
  );
}