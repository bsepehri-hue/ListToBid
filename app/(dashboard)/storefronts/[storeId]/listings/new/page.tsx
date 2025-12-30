"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UploadListingImages from "@/components/UploadListingImages";


export default function AddListingPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");
  const [category, setCategory] = useState("general");
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    await addDoc(collection(db, "listings"), {
      title,
      description,
      price: Number(price),
      condition,
      category,
      storeId,
      imageUrls,
      createdAt: serverTimestamp(),
      status: "active",
    });

    router.push(`/storefronts/${storeId}/listings`);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Add New Listing</h1>

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
            onChange={(e) => setPrice(e.target.value)}
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

        {/* Multi‑Image Upload */}
        <UploadListingImages images={imageUrls} setImages={setImageUrls} />

        {/* Preview Grid */}
        {imageUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

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