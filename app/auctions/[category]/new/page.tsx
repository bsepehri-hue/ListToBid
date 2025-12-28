"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UploadListingImages from "@/components/UploadListingImages";

export default function CreateAuctionPage() {
  const { category } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [startingBid, setStartingBid] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      alert("Start and end time are required.");
      return;
    }

    if (imageUrls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    await addDoc(collection(db, "auctions"), {
      category,
      title,
      description,
      startingBid: Number(startingBid),
      currentBid: Number(startingBid),
      reservePrice: reservePrice ? Number(reservePrice) : null,
      buyNowPrice: buyNowPrice ? Number(buyNowPrice) : null,
      bidCount: 0,
      reserveMet: false,
      startTime: new Date(startTime).getTime(),
      endTime: new Date(endTime).getTime(),
      imageUrls,
      status: "active",
      createdAt: serverTimestamp(),
    });

    router.push(`/auctions/${category}`);
  };

  const titleFormatted = String(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Create {titleFormatted} Auction
      </h1>

      <form
        onSubmit={handleCreate}
        className="bg-white p-8 rounded-xl shadow border space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg h-32 resize-none"
          />
        </div>

        {/* Starting Bid */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Starting Bid</label>
          <input
            type="number"
            required
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Reserve Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Reserve Price (optional)</label>
          <input
            type="number"
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Buy Now Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Buy It Now Price (optional)</label>
          <input
            type="number"
            value={buyNowPrice}
            onChange={(e) => setBuyNowPrice(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Images */}
        <UploadListingImages images={imageUrls} setImages={setImageUrls} />

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
}