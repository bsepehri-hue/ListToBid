export async function getProfile(userId: string) {
  return {
    id: userId,
    name: "Placeholder User",
    email: "placeholder@example.com",
  };
}