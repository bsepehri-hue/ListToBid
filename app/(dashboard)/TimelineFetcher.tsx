"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import ActivityTimeline from "./ActivityTimeline";

export default function TimelineFetcher() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "timeline"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  return <ActivityTimeline timeline={events} />;
}