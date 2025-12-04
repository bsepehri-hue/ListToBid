// components/profile/ProfileForm.tsx
"use client";

export default function ProfileForm() {
  return (
    <form className="space-y-4 p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">Profile Form</h3>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Save
      </button>
    </form>
  );
}