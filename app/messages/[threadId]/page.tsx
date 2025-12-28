"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ThreadPage() {
  const { threadId } = useParams();
  const userId = "demo-user"; // Replace with auth user ID

  const [thread, setThread] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load thread metadata
  useEffect(() => {
    const ref = doc(db, "threads", threadId as string);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setThread(snap.data());
    });

    return () => unsub();
  }, [threadId]);

  // Load messages
  useEffect(() => {
    const ref = collection(db, "threads", threadId as string, "messages");

    const q = query(ref, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snap) => {
      const items: any[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setMessages(items);
      setLoading(false);

      // Auto-scroll
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });

    return () => unsub();
  }, [threadId]);

  // Mark messages as read
  useEffect(() => {
    if (!thread) return;

    const ref = doc(db, "threads", threadId as string);

    const isA = thread.participants[0] === userId;

    updateDoc(ref, {
      [isA ? "unreadCountForA" : "unreadCountForB"]: 0,
    });
  }, [thread, threadId, userId]);

  const sendMessage = async () => {
    if (!body.trim()) return;

    const ref = collection(db, "threads", threadId as string, "messages");

    await addDoc(ref, {
      senderId: userId,
      body,
      createdAt: serverTimestamp(),
    });

    // Update thread metadata
    const threadRef = doc(db, "threads", threadId as string);

    const isA = thread.participants[0] === userId;

    await updateDoc(threadRef, {
      lastMessage: body,
      lastMessageAt: serverTimestamp(),
      [isA ? "unreadCountForB" : "unreadCountForA"]:
        (thread[isA ? "unreadCountForB" : "unreadCountForA"] || 0) + 1,
    });

    setBody("");
  };

  if (loading) return <p className="text-gray-600">Loading conversation…</p>;
  if (!thread) return <p className="text-gray-600">Thread not found.</p>;

  const contextLabel = (type: string) => {
    switch (type) {
      case "listing":
        return "Listing";
      case "auction":
        return "Auction";
      case "service":
        return "Service";
      case "storefront":
        return "Storefront";
      default:
        return "Message";
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[80vh]">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {contextLabel(thread.contextType)} Conversation
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => {
          const mine = m.senderId === userId;

          return (
            <div
              key={m.id}
              className={`flex ${
                mine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs shadow ${
                  mine
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{m.body}</p>
                <p className="text-xs opacity-70 mt-1">
                  {m.createdAt?.toDate
                    ? m.createdAt.toDate().toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 px-4 py-3 border rounded-xl"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}