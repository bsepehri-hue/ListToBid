"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import UploadListingImage from "@/components/UploadListingImage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CreateListingPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");
  const [category, setCategory] = useState("general");
const [imageUrl, setImageUrl] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

   <UploadListingImage onUpload={setImageUrl} />

{imageUrl && (
  <img
    src={imageUrl}
    alt="Listing"
    className="mt-4 w-32 h-32 object-cover rounded-lg border"
  />
)}

    // Redirect back to storefront detail page
    router.push(`/storefronts/${storeId}`);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Add New Listing
      </h1>

      <form
        onSubmit={handleCreate}
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
            placeholder="e.g., Vintage Leather Jacket"
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
            placeholder="Describe your item..."
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
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
            placeholder="e.g., 49.99"
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

        {/* Image Upload Placeholder */}
imageUrl,
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <div className="mt-2 p-6 border rounded-lg bg-gray-50 text-gray-500 text-sm">
            Image upload coming soon.
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}