 // --- Types ---
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: number;
  messages: Message[];
}

// --- Mock data ---
export const mockChats: Message[] = [
  { id: "1", senderId: "user-2", senderName: "Alice", content: "Hello!", timestamp: Date.now() },
  { id: "2", senderId: "user-3", senderName: "Bob", content: "Hi there!", timestamp: Date.now() },
];

// --- Current user ---
export const CURRENT_USER_ID = "user-1";
export const CURRENT_USER_NAME = "Alice";

// --- Placeholders ---
export const mockConversations: Conversation[] = [];
export const mockMessageMap: Record<string, Message[]> = {};
