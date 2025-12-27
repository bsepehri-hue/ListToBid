"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditListingPage() {
  const { storeId, listingId } = useParams();
  const router = useRouter();

  // Mock existing listing — replace with Firestore later
  const existingListing = {
    title: "Vintage Leather Jacket",
    description: "A classic brown leather jacket in great condition.",
    price: 120,
    condition: "used",
    category: "fashion",
    status: "active",
  };

  const [title, setTitle] = useState(existingListing.title);
  const [description, setDescription] = useState(existingListing.description);
  const [price, setPrice] = useState(existingListing.price);
  const [condition, setCondition] = useState(existingListing.condition);
  const [category, setCategory] = useState(existingListing.category);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder — replace with Firestore update later
    console.log("Updating listing:", {
      listingId,
      title,
      description,
      price,
      condition,
      category,
    });

    // Redirect back to listing detail page
    router.push(`/storefronts/${storeId}/listings/${listingId}`);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Edit Listing
      </h1>

      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-xl shadow border space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Listing Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-teal-600 focus:outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (USD)
          </label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          >
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
            <option value="for-parts">For Parts</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
          >
            <option value="general">General</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="collectibles">Collectibles</option>
            <option value="home">Home & Living</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}