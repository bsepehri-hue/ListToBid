"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Conversation, Message, mockConversations, mockMessageMap, CURRENT_USER_ID, CURRENT_USER_NAME } from '@/lib/mockData/chat';

// NOTE: In a production app, these server actions would interact with Firestore 
// or a dedicated real-time database like Firebase Realtime DB/Supabase.

/**
 * Server Action to fetch the list of active conversations for the current user.
 */
export async function getConversations(): Promise<Conversation[]> {
  // In a real app: filter conversations by CURRENT_USER_ID
  return mockConversations.sort((a, b) => b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime());
}

/**
 * Server Action to fetch the message history for a specific conversation.
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  // In a real app: fetch from DB, limit, and mark all messages as read for this conversation.

  if (mockMessageMap[conversationId]) {
    // Mock: sort messages oldest first for chat display
    return mockMessageMap[conversationId].sort(
      (a, b) => a.timestamp - b.timestamp
    );
  }

  return [];
}

const SendMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1, "Message cannot be empty.").max(500, "Message is too long."),
});

/**
 * Server Action to send a new message and update the conversation list.
 * @returns The newly created message object.
 */
export async function sendMessage(formData: FormData): Promise<Message | null> {
  const validatedFields = SendMessageSchema.safeParse({
    conversationId: formData.get('conversationId'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    console.error('Message validation failed:', validatedFields.error.flatten());
    return null;
  }

  const { conversationId, content } = validatedFields.data;

  // MOCK: Simulate adding the new message
  const newMessage: Message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    senderId: CURRENT_USER_ID,
    senderName: CURRENT_USER_NAME,
    content: content,
    timestamp: new Date(),
  };

  if (!mockMessageMap[conversationId]) {
    mockMessageMap[conversationId] = [];
  }
  mockMessageMap[conversationId].push(newMessage);
  
  // MOCK: Update last message in the conversation list
  const convoIndex = mockConversations.findIndex(c => c.id === conversationId);
  if (convoIndex !== -1) {
    mockConversations[convoIndex].lastMessage = content;
    mockConversations[convoIndex].lastMessageTimestamp = newMessage.timestamp;
    mockConversations[convoIndex].unreadCount = 0; // The sender resets their own unread count
  }

  // Revalidate the messages page and possibly the header (if chat state affects a badge)
  revalidatePath('/dashboard/messages'); 
  
  return newMessage;
}
