"use client";

export default function ProfileForm() {
  return (
    <form className="space-y-4">
      <h3 className="text-xl font-bold">Profile Form</h3>
      <input type="text" placeholder="Name" className="border p-2 w-full" />
      <input type="email" placeholder="Email" className="border p-2 w-full" />
      <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}