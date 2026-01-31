"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function CarDetailClient() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // fetch logic here…

  return (
    <div>
      {/* your UI */}
    </div>
  );
}
