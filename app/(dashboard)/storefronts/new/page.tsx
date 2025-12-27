"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStorefrontPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder — replace with Firestore later
    console.log("Creating storefront:", { name, description });

    // Redirect back to storefront dashboard
    router.push("/storefronts");
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Create a New Storefront
      </h1>

      <form
        onSubmit={handleCreate}
        className="bg-white p-8 rounded-xl shadow border space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Storefront Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
            placeholder="e.g., Bazaria Essentials"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-teal-600 focus:outline-none"
            placeholder="Describe your storefront..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Create Storefront
        </button>
      </form>
    </div>
  );
}