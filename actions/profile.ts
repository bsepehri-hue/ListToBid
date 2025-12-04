// actions/profile.ts

// Fetch a user profile (placeholder)
export async function getProfile(userId: string) {
  return {
    id: userId,
    name: "Placeholder User",
    email: "placeholder@example.com",
  };
}

// ✅ Add missing exports so imports resolve

// Update a user profile (placeholder)
export async function updateProfile(userId: string, updates: { name?: string; email?: string }) {
  // Replace with Firestore update later
  return {
    id: userId,
    name: updates.name || "Updated User",
    email: updates.email || "updated@example.com",
  };
}

// Delete a user profile (placeholder)
export async function deleteProfile(userId: string) {
  // Replace with Firestore delete later
  return { id: userId, deleted: true };
}