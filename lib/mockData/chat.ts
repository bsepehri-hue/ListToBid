// lib/mockData/chat.ts

// --- Types ---
export interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: number; // required now
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageTimestamp: Date;
  messages: Message[];
}

// --- Mock data ---
export const mockChats: Message[] = [
  { id: "1", sender: "Alice", message: "Hello!", timestamp: Date.now() },
  { id: "2", sender: "Bob", message: "Hi there!", timestamp: Date.now() },
];

// --- Current user ---
export const CURRENT_USER_ID = "user-1";
export const CURRENT_USER_NAME = "Alice";

// --- Placeholders until real DB/API logic is added ---
export const mockConversations: Conversation[] = [];
export const mockMessageMap: Record<string, Message[]> = {};