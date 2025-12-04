export interface Profile {
  id: string;
  name: string;
  email: string;
}

export const mockProfile: Profile = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
};