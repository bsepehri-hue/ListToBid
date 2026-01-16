"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../../lib/firebase';
import useAuth from '../../../../hooks/useAuth'

export default function NewMessagePage() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth(); // current logged-in user
  const sellerId = params.get("to");

  useEffect(() => {
    const run = async () => {
      if (!user || !sellerId) return;

      // 1. Check if a thread already exists
      const threadsRef = collection(db, "threads");
      const q = query(
        threadsRef,
        where("participants", "array-contains", user.uid)
      );

      const snap = await getDocs(q);

      let existingThread = null;

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(sellerId)) {
          existingThread = doc.id;
        }
      });

      // 2. If thread exists → redirect
      if (existingThread) {
        router.replace(`/dashboard/messages/${existingThread}`);
        return;
      }

      // 3. Otherwise create a new thread
      const newThread = await addDoc(collection(db, "threads"), {
        participants: [user.uid, sellerId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: null,
      });

      // 4. Redirect to the new thread
      router.replace(`/dashboard/messages/${newThread.id}`);
    };

    run();
  }, [user, sellerId, router]);

  return (
    <p className="text-gray-600 p-6">
      Preparing your conversation…
    </p>
  );
}