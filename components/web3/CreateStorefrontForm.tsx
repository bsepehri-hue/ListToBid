// components/storefront/CreateStorefrontForm.tsx
"use client";

export default function CreateStorefrontForm() {
  return (
    <form className="p-4 border rounded flex flex-col gap-2">
      <h3 className="font-semibold mb-2">Create Storefront</h3>
      <input
        type="text"
        placeholder="Storefront Name"
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}