// lib/mockData/chat.ts

export interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp?: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageTimestamp: Date;
  messages: Message[];
}

// Mock chat messages
export const mockChats = [
  { id: 1, sender: "Alice", message: "Hello!" },
  { id: 2, sender: "Bob", message: "Hi there!" },
];

export const CURRENT_USER_ID = "user-1";
export const CURRENT_USER_NAME = "Alice";

// Placeholder mocks until real data is wired up
export const mockConversations: Conversation[] = [];
export const mockMessageMap: Record<string, Message[]> = {};